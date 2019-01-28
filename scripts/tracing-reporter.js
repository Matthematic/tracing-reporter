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
            ...config,
            tags: {
                name: 'requirement',
                issue: 'issue',
                traces: 'traces',
                ...config.tags
            }
        };
    
        this.testMap = {};
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
        const orderedTestMap = {};
        Object.keys(this.testMap).sort().forEach(key => {
            orderedTestMap[key] = this.testMap[key];
        });
        return orderedTestMap;
    }

    getCount() {
        let i = 0;
        Object.keys(this.testMap).forEach(id => {
            i += this.testMap[id].length;
        });
        return i;
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
        Object.keys(sortedMap).forEach(id => {
            sortedMap[id].forEach(test => {
                this.append(`| ${id} | <h6>${test.name}</h6> | ${test.issues[0] || ''} | [${test.shortLink}](${test.link}) \n`);
            });
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
            const issueTags = block.tags.filter(tag => tag.title === this.config.tags.issue);
            const tracesTags = block.tags.filter(tag => tag.title === this.config.tags.traces);
            const issues = issueTags.map(issue => `[${issue.value}](${this.config.issueHost}${issue.value})`);
            tracesTags.forEach(test => {
                if (block.meta) {
                    const id = test.value.split(' - ')[0];
                    const name = test.value.split(' - ')[1];
                    const link = '../' + fileName + '#L' + block.meta.lineno;
                    const shortLink = fileName.split('').reverse().join('').split('/')[0].split('').reverse().join('') + '#L' + block.meta.lineno; // yikes
                    if (!this.testMap[id]) {
                        this.testMap[id] = [{ name, link, issues, shortLink }];
                    }
                    else {
                        this.testMap[id] = [...this.testMap[id], { name, link, issues, shortLink }];
                    }
                }
            });
        });
    }
}


const config = require(process.cwd() + '/' + process.argv[process.argv.indexOf('--config')+1]);
const reporter = new TracingReport(config);
reporter.build();