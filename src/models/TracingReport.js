/* global process */
import jsdoc from 'jsdoc-api';
import glob from 'glob';
import { promises } from 'fs';
import path from 'path';
import _ from 'underscore';
import * as babel from '@babel/core';
import TableMap from './TableMap';
import Printer from './Printer';
import Test from './Test';
import Config from './Config';
import Spinnies from 'spinnies';
const { readFile } = promises;

class TracingReport {
    /**
     * Creates config object and clears report file
     * @param {Object} customConfig the custom config options to use
     */
    constructor(customConfig = {}) {
        try {
            this.config = new Config(customConfig).validate().get();
        }
        catch(e) {
            console.error(`There is a problem with the config: ${e}`)
            process.exit(1);
        }
        this.log = {
            verbose: (msg) => {
                if (!this.config.silent && this.config.verbose) {
                    console.log(msg)
                }
            },
            info: (msg) => {
                if (!this.config.silent) {
                    console.log(msg)
                }
            }
        }

        this.log.verbose('VERBOSE LOGGING');
        this.log.verbose(this.config)
        this.setup();
    }

    /**
     * Performs prerequisite steps:
     * 1. Checks that the target directory exists, and creates if it it does not
     * 2. Clears the report if one already exists
     */
    setup() {
        try {
            if (this.config.reportPath) {
                Printer.checkDir(this.config.reportPath)
            }

            if (this.config.dataPath) {
                Printer.checkDir(this.config.dataPath);
            }

            this.progressCap = 0;

            this.spinnies = new Spinnies();
        }
        catch(e) {
            console.error(`There is a problem setting up the files: ${e}`)
            process.exit(1);
        }
    }

    /**
     * Builds the report.
     *  1. Parses unit tests
     *  2. Parses Graybox tests
     *  3. Creates a Map<String, List> of ID's to test objects
     *  4. Transforms the Map into a final string to append to the report file
     */
    async build() {
        const prom = Promise.all( // Process glob patterns and read jsdoc from the files
            Object.keys(this.config.types).map(key => this.buildType(key, this.config.types[key]))
        )
        .then(async (results) => { // Aggregate all the resulting tests and populate the table map struct
            this.log.verbose('Aggregating results');
            const tableMap = new TableMap().add(_.flatten(results).filter(Boolean)).sort(this.config.tableSortKey, this.config.tableSortDirection, this.config.sortDirection)

            return Promise.all([
                new Promise((resolve, reject) => {
                    if (!this.config.dataPath) resolve();
                    const result = Printer.printData(this.config, tableMap)
                    if (result) {
                        this.log.info(`Printed ${tableMap.count()} tables to "${this.config.dataPath}"`)
                        resolve()
                    }
                    reject()
                }),
                new Promise((resolve, reject) => {
                    if (!this.config.reportPath) resolve();
                    const result = Printer.printMarkdown(this.config, tableMap)
                    if (result) {
                        this.log.info(`Printed ${tableMap.getTests().length} tests to "${this.config.reportPath}"`)
                        resolve()
                    }
                    reject()
                }),
            ])
        })
        .catch(e => {
            console.error(`Error: ${e}`)
            process.exitCode = 1;
        })
        return prom;
    }

    /**
     * Parses every file that matches the glob pattern
     */
     async buildType(name, globPattern) {
        if (globPattern && globPattern.length) {
            if (!this.config.silent) this.spinnies.add(name, { text: name });
            this.log.verbose(`Parsing ${name}`);

            let globs = []
            if (Array.isArray(globPattern)) {
                globs = [...globPattern]
            }
            else {
                globs.push(globPattern);
            }

            return Promise.all(
                globs.map(pattern => new Promise((resolve, reject) => {
                    glob(pattern, {}, function (er, files) {
                        if (er) {
                            reject(er);
                        }
                        resolve(files)
                    })
                }))
            ).then(async files => {
                const flattenedFiles = _.flatten(files);
                this.log.verbose(`Process files: ${flattenedFiles}`);
                const tests = await Promise.all(
                    flattenedFiles.map(file => {
                        return this.parseFile(file, name)
                    })
                );
                if (!this.config.silent) this.spinnies.succeed(name, { text: `${name} (${_.flatten(tests).length})` });
                return tests;
            });
        }
    }

    /**
     * Reads a file, parses the jsdoc comments and adds tests to the tests array
     * @param {String} fileName 
     * @returns {Promise}
     */
    async parseFile(fileName, type = '') {
        return readFile(fileName)
            .then(async code => {
                const fileExt = path.extname(fileName);
                const isTsFile = !!fileExt.match(/\.tsx?$/);
                const transpiledSourceCode = isTsFile && babel.transformSync(
                    code,
                    {filename: fileName, retainLines: true, presets: [['@babel/preset-typescript', { isTSX: !!fileExt.match('.tsx'), allExtensions: true }]]}
                ).code;

                const options = {
                    source: isTsFile ? transpiledSourceCode : code,
                    cache: true,
                }
                return jsdoc
                    .explain(options)
                    .then(result => this.parseExplanations(result, fileName, type));
            })
            .catch(e => {
                process.exitCode = 1;
                throw new Error(`Error parsing ${fileName} ${e}`);
            });
    }

    /**
     * Parses the result of jsdoc.explain and adds tests to the tests array
     * @param {Array} explanations 
     */
    parseExplanations(explanations, fileName = '', type = '') {
        this.log.verbose(`Parsing JSDoc from ${fileName}`)
        const NA = 'N/A';
        const tests = [];

        const testPlanBlock = explanations
          .filter(commentObj => commentObj.name === this.config.tags.name) // get blocks with the correct name
          .filter(block => !!block.tags);

        testPlanBlock.forEach(block => {
            // We need to get all @traces tags and map them to the parent @jira tag. 
            // This is best done in reverse
            const reversedIssueIndices = block.tags
              .filter(tag => tag.title === this.config.tags.issue)
              .map(b => block.tags.findIndex(t => t === b))
              .reverse();

            block.tags
                .filter(tag => tag.title === this.config.tags.traces)
                .filter(() => !!block.meta)
                .forEach(test => {
                    const testIdx = block.tags.findIndex(t => t === test);
                    // get the parent issues for this @traces tag
                    let issues = NA;
                    for(let i = 0; i < reversedIssueIndices.length; ++i) {
                        if (reversedIssueIndices[i] < testIdx) {
                            issues = block.tags[reversedIssueIndices[i]].value;
                            break;
                        }
                    }

                    let id = NA;
                    let name = NA;
                    const link = '../' + fileName + '#L' + block.meta.lineno;
                    const shortLink = fileName.split('/').pop();

                    const matched = this.config.matcher(test.value);
                    if (!matched) {
                        console.warn(`Warning - Encountered a test that doesn't match the expected format: ${'./' + fileName + ':' + block.meta.lineno}`)
                    }
                    else {
                        ({ id, name } = matched)
                    }
                    
                    if (Array.isArray(id)) { // should always be an array
                        id.forEach(x => {
                            name = name.trim();
                            this.log.verbose(`writing ${name}`);

                            const fields = { id: x, name, link, issues: issues.split(',').map(i => i.trim()), shortLink, type };
                            if (this.config.filter(fields)) {
                                tests.push(new Test(fields));
                            }
                        });
                    }
                });
        });
        return tests;
    }
}

module.exports = TracingReport;