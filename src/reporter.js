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
            return x[this.config.sortKey] > y[this.config.sortKey];
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
        const tableHeader = `#### Total: ${this.getCount()}\n` +
                            '| ID | Name | Issue | Source |\n' +
                            '| --- | --- | --- | --- |\n';
        this.append(tableHeader);

        sortedMap.forEach(test => {
            const issueListItems = test.issues.map(issue => `<li>[${issue}](${this.config.issueHost}${issue})</li>`).join('');
            const issueListStr = issueListItems.length ? '<ul style="list-style-type:none;padding-left:0;">' + issueListItems + '</ul>' : '';
            this.append(`| ${test.id} | <h6>${test.name}</h6> | ${issueListStr} | [${test.shortLink}](${test.link}) \n`);
        });
    }

    buildWebdriver() {
        if (this.config.wdioGlob.length) {
            glob.sync(this.config.wdioGlob).forEach(file => {
                this.parse(file);
            });
        }
    }

    buildJest() {
        if (this.config.unitGlob) {
            glob.sync(this.config.unitGlob).forEach(file => {
                this.parse(file);
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

    parse(fileName) {
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
                    let issues;
                    for(let i = 0; i < reversedIssueIndices.length; ++i) {
                        if (reversedIssueIndices[i] < testIdx) {
                            issues = block.tags[reversedIssueIndices[i]].value;
                            break;
                        }
                    }

                    if (issues && issues.length){
                        issues = issues.split(',').map(s => s.trim()); // split into trimmed array
                    }
                    else {
                        issues = [];
                    }


                    const id = test.value.split(' - ')[0];
                    const name = test.value.split(' - ')[1];
                    const link = '../' + fileName + '#L' + block.meta.lineno;
                    const shortLink = fileName.split('').reverse().join('').split('/')[0].split('').reverse().join('') + '#L' + block.meta.lineno; // yikes
                    this.tests.push({ id, name, link, issues, shortLink });
                }
            });
        });
    }
}

module.exports = TracingReport;