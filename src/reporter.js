/* global process */
const jsdoc = require('jsdoc-api');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const _ = require('underscore');
const babel = require('@babel/core');

class TracingReport {
    /**
     * Creates config object and clears report file
     * @param {Object} customConfig the custom config options to use
     */
    constructor(customConfig={}) {
        this.log = () => {};
        this.config = {
            grayboxGlob: 'tests/wdio/**/*.+(js|jsx)',
            blackboxGlob: 'tests/wdio/blackbox/**/*.+(js|jsx)',
            unitGlob: 'tests/components/*.test.+(js|jsx)',
            issueHost: 'https://jira2.cerner.com/browse/',
            sortKey:'id',
            ...customConfig,
            tags: {
                name: 'requirement',
                issue: 'issue',
                traces: 'traces',
                ...customConfig.tags
            },
        };
        this.tests = [];
        this.setup();
        this.processArgs();
    }

    checkDir(path = '') {
        let fileIdx = [...path].reverse().indexOf('/');
        if (fileIdx !== -1) {
            const dirPath = [...path].reverse().slice(fileIdx, path.length).reverse().join('');

            if (!fs.existsSync(dirPath)){
                fs.mkdirSync(dirPath);
            }
            else {
                this.clear();
            }
            return true;
        }
        return false;
    }

    /**
     * Performs prerequisite steps:
     * 1. Checks that the target directory exists, and creates if it it does not
     * 2. Clears the report if one already exists
     */
    setup() {
        let reportPathValid = true;
        let dataPathValid = true;
        
        if (this.config.reportPath) {
            reportPathValid = this.checkDir(this.config.reportPath)
        }

        if (this.config.dataPath) {
            dataPathValid = this.checkDir(this.config.dataPath);
        }


        if (!this.config.reportPath && !this.config.dataPath) {
            throw new Error("You must supply either a dataPath param or a reportPath param");
        }
        if (reportPathValid == false) {
            throw new Error("Report Path does not contain a valid directory path (must contain './' if meant to be current directory)");
        }
        if (dataPathValid == false) {
            throw new Error("Data Path does not contain a valid directory path (must contain './' if meant to be current directory)");
        }
    }

    /**
     * Process command line arguments
     */
    processArgs() {
        process.argv.splice(2).forEach((val) => {
            switch(val) {
                case '-v':
                case '--verbose':
                    this.log = (msg) => { console.log(msg) };
                    this.log('VERBOSE LOGGING');
            }
        });
    }

    /**
     * Clears everything out of the report file except the report header
     */
    clear() {
        if (this.config.reportPath) {
            try {
                fs.writeFileSync(this.config.reportPath, '# Tracing Report \r\n');
            } catch (e) {
                console.log('Could not clear the reportPath', e);
            }
        }

        if (this.config.dataPath) {
            try {
                fs.writeFileSync(this.config.dataPath, '');
            } catch (e) {
                console.log('Could not clear the dataPath', e);
            }
        }
    }

    createTableMap() {
        this.buildUnit();
        this.buildGraybox();
        this.buildBlackbox();

        // sort the tests by id
        const sortedMap =  _.sortBy(this.tests, 'id' );

        // create a data structure for 1 table per ID
        this.tableMap = {};

        // prepare tableMap with empty arrays
        sortedMap.forEach(test => {
            this.tableMap[test.id] = [];
        });

        // populate tableMap
        sortedMap.forEach(test => {
            const { name, link, issues, shortLink, type } = test;
            this.tableMap[test.id].push({ name, link, issues, shortLink, type });
        });

        //console.log("tableMap before sorting", this.tableMap)

        // sort the tables
        Object.keys(this.tableMap).forEach(id => {
            if (this.config.sortKey === 'issue'){
                if (this.tableMap[id].issues == undefined) {
                    console.log(this.tableMap[id])
                }
                this.tableMap[id] = _.sortBy(this.tableMap[id], (test) => {
                    return test.issues.toString();
                } ); // sort by the issue string
            }
            else {
                this.tableMap[id] = _.sortBy(this.tableMap[id], this.config.sortKey ); // sort each table by sortKey
            }
        });

        //console.log("tableMap after sorting", this.tableMap)
    }

    createDataFile() {
        if (this.config && this.config.dataPath) {
            this.append(this.config.dataPath, JSON.stringify(this.tableMap, null, 2));
        }
    }

    createMarkdownFile() {
        const escapeChars = [
            [ /\*/g, '\\*' ],
            [ /#/g, '\\#' ],
            [ /\//g, '\\/' ],
            [ /\(/g, '\\(' ],
            [ /\)/g, '\\)' ],
            [ /\[/g, '\\[' ],
            [ /\]/g, '\\]' ],
            [ /</g, '&lt;' ],
            [ />/g, '&gt;' ],
            [ /_/g, '\\_' ],
            [/\n/g, '<br/>'] // MAKE SURE THIS IS LAST - THE < AND > HERE SHOULD NOT BE ESCAPED OR PRE TAG WILL FAIL
        ];

        if (this.config && this.config.reportPath) {
            const reportHeader = `#### Total: ${this.tests.length} (Unit: ${this.tests.filter(t => t.type === 'Unit').length} Graybox: ${this.tests.filter(t => t.type === 'Graybox').length} )\n`;

            // print tableMap to report file
            let appendStr = reportHeader;
            Object.keys(this.tableMap).forEach(id => { // for each table
                let testRows = this.tableMap[id].map(test => {
                    let { name, link, issues, shortLink, type } = test;

                    // escape characters for the name since it has to be proper markdown
                    escapeChars.forEach(char => {
                        name = name.replace(char[0], char[1]);
                    });
                    //name = `*${name.trim()}*`;

                    // Generate the display for the issue links
                    const issueLinks = issues.map(i => i.trim()).map(issue => issue !== 'N/A' ? `[${issue}](${this.config.issueHost}${issue})` : issue);

                    // Generate the display for the test name.
                    let formattedName = new String(name);
                    formattedName = formattedName.replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // At this point, only sequences of 4 spaces are considered as a supported indention

                    return `| <h6>${formattedName}</h6> | [${shortLink}](${link}) | ${issueLinks.join('<br/>')} | ${type} |`;
                });

                const tableHeader = `| Name (${testRows.length}) | Link | ${'&nbsp;'.repeat(7)}Issue${'&nbsp;'.repeat(7)} | Type |\n` +
                                        '| :--- | :---: | :---: | :---: |\n';
                const rows = testRows.join('\n');
                appendStr += `\n\n### ${id}\n\n` + tableHeader + rows + '\n\n<hr/>';
            });
            this.append(this.config.reportPath, appendStr);
        }
    }

    /**
     * Builds the report.
     *  1. Parses unit tests
     *  2. Parses Graybox tests
     *  3. Creates a Map<String, List> of ID's to test objects
     *  4. Transforms the Map into a final string to append to the report file
     */
    build() {
        console.log('Generating report with the following config:\n\n', this.config);

        // populate the this.tableMap property 
        this.createTableMap();

        // print the files
        this.createDataFile();
        this.createMarkdownFile();
        
    }

    /**
     * Parses every file that matches the blackbox glob pattern
     */
    buildBlackbox() {
        if (this.config.blackboxGlob.length) {
            glob.sync(this.config.blackboxGlob).forEach(file => {
                this.log(`parsing Blackbox Test: ${file}`);
                this.parse(file, 'Blackbox');
            });
        }
    }

    /**
     * Parses every file that matches the graybox glob pattern
     */
    buildGraybox() {
        if (this.config.grayboxGlob.length) {
            glob.sync(this.config.grayboxGlob).forEach(file => {
                this.log(`parsing Graybox Test: ${file}`);
                this.parse(file, 'Graybox');
            });
        }
    }

    /**
     * Parses every file that matches the unit glob pattern
     */
    buildUnit() {
        if (this.config.unitGlob) {
            glob.sync(this.config.unitGlob).forEach(file => {
                this.log(`parsing Unit Test: ${file}`);
                this.parse(file, 'Unit');
            });
        }
    }

    /**
     * writes a string to the reportPath file
     * @param {String} str the string to append
     */
    append(location, payload) {
        if (location) {
            fs.appendFileSync(
                location,
                payload,
                function (err) {
                    if (err) throw err;
                }
            );  
        }
    }

    /**
     * Given a file, this parses the jsdoc for tests and pushes them into this.tests
     * @param {String} fileName the path of the file to parse
     * @param {String} type the type of tests being parsed. e.g. Unit/Graybox
     */
    parse(fileName, type='') {

        const NA = 'N/A';
        const sourceCode = fs.readFileSync(fileName).toString();
        const fileExt = path.extname(fileName);
        const isTsFile = !!fileExt.match(/\.tsx?$/);
        const transpiledSourceCode = isTsFile && babel.transformSync(
            sourceCode,
            {filename: fileName, retainLines: true, presets: [['@babel/preset-typescript', { isTSX: !!fileExt.match('.tsx'), allExtensions: true }]]}
        ).code;
        const parsed = jsdoc.explainSync({ source: isTsFile ? transpiledSourceCode : sourceCode });
        const testPlanBlock = parsed
          .filter(commentObj => commentObj.name === this.config.tags.name)
          .filter(block => !!block.tags);

        testPlanBlock.forEach(block => {
            // we are going to search through these in reverse order
            const reversedIssueIndices = block.tags
              .filter(tag => tag.title === this.config.tags.issue)
              .map(b => block.tags.findIndex(t => t === b))
              .reverse();

            block.tags.filter(tag => tag.title === this.config.tags.traces)
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

                    // filter by issue
                    if (this.config.filters) {
                        if (Array.isArray(this.config.filters.issue)) {
                            const issueArray = issues.split(',').map(i => i.trim());
                            if (!_.intersection(this.config.filters.issue, issueArray).length) {
                                return;
                            }
                        }
                        else if (typeof this.config.filters.issue === "string") {
                            if (!issues.includes(this.config.filters.issue)) {
                                return;
                            }
                        }
                    }

                    let id = NA;
                    let name = NA;
                    // if the test names have "123456 - test name" format
                    if (/^[0-9]+\s*-\s*/.test(test.value)) {
                        id = test.value.slice(0, test.value.indexOf('-')).trim();
                        name = test.value.slice(test.value.indexOf('-') + 1).trim();
                    }
                    else {
                        name = test.value;
                    }
                    
                    name = name.trim();
                    const link = '../' + fileName + '#L' + block.meta.lineno;
                    const shortLink = fileName.split('/').pop();
                    this.log(`writing ${name}`);
                    this.tests.push({ id, name, link, issues: issues.split(',').map(i => i.trim()), shortLink, type });

                    });
        });
    }
}

module.exports = TracingReport;