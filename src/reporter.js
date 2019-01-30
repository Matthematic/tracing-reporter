const jsdoc = require('jsdoc-api')
const fs = require('fs');
const glob = require('glob');

class TracingReport {
    constructor(config={}) {
        this.config = {
            reportPath: './report.md',
            wdioGlob: 'tests/wdio/**/*.+(js|jsx)',
            unitGlob: 'tests/components/*.test.+(js|jsx)',
            issueHost: 'https://jira2.cerner.com/browse/',
            sortKey:'name',
            ...config,
            tags: {
                name: 'requirement',
                issue: 'issue',
                traces: 'traces',
                ...config.tags
            }
        };
    
        this.tests = [];
        this.clear();
    }

    clear() {
        try {
            fs.writeFileSync(this.config.reportPath, '# Tracing Report \r\n');
        } catch (e) {
            console.log('Could not clear the reportPath', e);
        }
    }

    getSortedMap() {
        return this.tests.sort((x, y) => {
            if (x[this.config.sortKey] && y[this.config.sortKey]) {
                return ( 
                    (x[this.config.sortKey] - y[this.config.sortKey]) || // numbers
                    (x[this.config.sortKey].toLowerCase() > y[this.config.sortKey].toLowerCase()) // words
                );
            }
            return true;
        });
    }

    getCount() {
        return this.tests.length;
    }
  
    build() {
        console.log('Generating report with the following config:\n\n', this.config);
        this.buildJest();
        this.buildWebdriver();
        const sortedMap = this.getSortedMap();
        const tableHeader = `#### Total: ${this.getCount()} (Unit: ${this.tests.filter(t => t.type === 'Unit').length} Graybox: ${this.tests.filter(t => t.type === 'Graybox').length} )\n` +
                            '| ID | Name | Issue | Link | Type |\n' +
                            '| ---: | :--- | :---: | :---: | :---: |\n';
        this.append(tableHeader);

        sortedMap.forEach(test => {
            const issueLink = test.issue !== 'N/A' ? `[${test.issue}](${this.config.issueHost}${test.issue})` : test.issue;
            this.append(`| ${test.id} | <h6>${test.name}</h6> | ${issueLink} | [${test.shortLink}](${test.link}) | ${test.type} |\n`);
        });
    }

    buildWebdriver() {
        if (this.config.wdioGlob.length) {
            glob.sync(this.config.wdioGlob).forEach(file => {
                this.parse(file, 'Graybox');
            });
        }
    }

    buildJest() {
        if (this.config.unitGlob) {
            glob.sync(this.config.unitGlob).forEach(file => {
                this.parse(file, 'Unit');
            });
        }
    }

    append(str) {
        fs.appendFileSync(
            this.config.reportPath,
            str,
            function (err) {
                if (err) throw err;
            }
        );  
    }

    parse(fileName, type='') {
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
                    let issue = 'N/A';
                    for(let i = 0; i < reversedIssueIndices.length; ++i) {
                        if (reversedIssueIndices[i] < testIdx) {
                            issue = block.tags[reversedIssueIndices[i]].value;
                            break;
                        }
                    }

                    let id = 'N/A';
                    let name = 'N/A';
                    // if the test names have "123456 - test name" format
                    if (/^[0-9]+ - \w+/.test(test.value)) {
                        id = test.value.split(' - ')[0].trim();
                        name = test.value.split(' - ')[1].replace(/\n/g, '<br/>').trim(); // replace newlines or they break the markdown table
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