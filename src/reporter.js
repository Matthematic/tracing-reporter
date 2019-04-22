const jsdoc = require('jsdoc-api')
const fs = require('fs');
const glob = require('glob');
const _ = require('underscore');

class TracingReport {
    /**
     * Creates config object and clears report file
     * @param {Object} customConfig the custom config options to use
     */
    constructor(customConfig={}) {
        this.config = {
            reportPath: './report.md',
            grayboxGlob: 'tests/wdio/**/*.+(js|jsx)',
            unitGlob: 'tests/components/*.test.+(js|jsx)',
            issueHost: 'https://jira2.cerner.com/browse/',
            sortKey:'id',
            ...customConfig,
            tags: {
                name: 'requirement',
                issue: 'issue',
                traces: 'traces',
                ...customConfig.tags
            }
        };
    
        this.tests = [];
        this.clear();
    }

    /**
     * Clears everything out of the report file except the report header
     */
    clear() {
        try {
            fs.writeFileSync(this.config.reportPath, '# Tracing Report \r\n');
        } catch (e) {
            console.log('Could not clear the reportPath', e);
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
        this.buildUnit();
        this.buildGraybox();

        const reportHeader = `#### Total: ${this.tests.length} (Unit: ${this.tests.filter(t => t.type === 'Unit').length} Graybox: ${this.tests.filter(t => t.type === 'Graybox').length} )\n`;
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
            const { name, link, issue, shortLink, type } = test;
            this.tableMap[test.id].push({ name, link, issue, shortLink, type });
        });

        // sort the tables
        Object.keys(this.tableMap).forEach(id => {
            this.tableMap[id] = _.sortBy(this.tableMap[id], this.config.sortKey ); // sort each table by sortKey
        });
        
        // print tableMap to report file
        let appendStr = reportHeader;
        Object.keys(this.tableMap).forEach(id => { // for each table
            let testRows = this.tableMap[id].map(test => {
                const { name, link, issue, shortLink, type } = test;
                const issueLink = issue !== 'N/A' ? `[${issue}](${this.config.issueHost}${issue})` : issue;
                return `| <h6>${name}</h6> | [${shortLink}](${link}) | ${issueLink} | ${type} |`;
            });

            const tableHeader = `| Name (${testRows.length}) | Link | ${'&nbsp;'.repeat(7)}Issue${'&nbsp;'.repeat(7)} | Type |\n` +
                                    '| :--- | :---: | :---: | :---: |\n';
            const rows = testRows.join('\n');
            appendStr += `\n\n<h3>${id}</h3>\n\n` + tableHeader + rows + '\n<hr/>';
        });
        this.append(appendStr);
    }

    /**
     * Parses every file that matches the graybox glob pattern
     */
    buildGraybox() {
        if (this.config.grayboxGlob.length) {
            glob.sync(this.config.grayboxGlob).forEach(file => {
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
                this.parse(file, 'Unit');
            });
        }
    }

    /**
     * writes a string to the reportPath file
     * @param {String} str the string to append
     */
    append(str) {
        fs.appendFileSync(
            this.config.reportPath,
            str,
            function (err) {
                if (err) throw err;
            }
        );  
    }

    /**
     * Given a file, this parses the jsdoc for tests and pushes them into this.tests
     * @param {String} fileName the path of the file to parse
     * @param {String} type the type of tests being parsed. e.g. Unit/Graybox
     */
    parse(fileName, type='') {
        const escapeChars = [
            [/\n/g, '<br/>'],
            [ /\*/g, '\\*' ],
            [ /#/g, '\\#' ],
            [ /\//g, '\\/' ],
            [ /\(/g, '\\(' ],
            [ /\)/g, '\\)' ],
            [ /\[/g, '\\[' ],
            [ /\]/g, '\\]' ],
            [ /\</g, '&lt;' ],
            [ /\>/g, '&gt;' ],
            [ /_/g, '\\_' ]
        ];

        const NA = 'N/A';
        const sourceCode = fs.readFileSync(fileName).toString();
        const parsed = jsdoc.explainSync({ source: sourceCode });
        const testPlanBlock = parsed.filter(commentObj => commentObj.name === this.config.tags.name);
        testPlanBlock.forEach(block => {
            // we are going to search through these in reverse order
            const reversedIssueIndices = block.tags.filter(tag => tag.title === this.config.tags.issue).map(b => block.tags.findIndex(t => t === b)).reverse();
            const tracesTags = block.tags.filter(tag => tag.title === this.config.tags.traces);
            tracesTags.forEach(test => {
                const testIdx = block.tags.findIndex(t => t === test);
                if (block.meta) {
                    // get the parent issues for this @traces tag
                    let issue = NA;
                    for(let i = 0; i < reversedIssueIndices.length; ++i) {
                        if (reversedIssueIndices[i] < testIdx) {
                            issue = block.tags[reversedIssueIndices[i]].value;
                            break;
                        }
                    }

                    let id = NA;
                    let name = NA;
                    // if the test names have "123456 - test name" format
                    if (/^[0-9]+ - /.test(test.value)) {
                        id = test.value.split(' - ')[0].trim();
                        name = test.value.split(' - ')[1];
                        escapeChars.forEach(char => {
                            name = name.replace(char[0], char[1]);
                        });
                        name = name.trim();
                    }
                    else {
                        name = test.value.trim();
                    }
                    const link = '../' + fileName + '#L' + block.meta.lineno;
                    const shortLink = fileName.split('').reverse().join('').split('/')[0].split('').reverse().join('') + '#L' + block.meta.lineno; // yikes
                    this.tests.push({ id, name, link, issue, shortLink, type });
                }
            });
        });
    }
}

module.exports = TracingReport;