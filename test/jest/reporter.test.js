var assert = require('assert');
var TracingReport = require('../../src/reporter');
const snapshot = require('snap-shot-it')

let markdownResult;
let dataResult;
getReport = (instance) => {
    if (instance) {
        instance.append = (location, payload) => {
            if (location === instance.config.reportPath) {
                markdownResult = payload;
            }
            else if (location === instance.config.dataPath) {
                dataResult = payload;
            }
        }

        instance.build();
        return markdownResult || dataResult;
    }
} 

describe('Validation', function() {
    it('fails with no report path params', () => {
        assert.throws(() => new TracingReport(), "You must supply either a dataPath param or a reportPath param");
    });

    it('fails with invalid reportPath param', () => {
        assert.throws(() => new TracingReport({
            reportPath: './wowzers/idontexist/lol.md',
        }), "Report Path does not contain a valid directory path (must contain './' if meant to be current directory)");
    });

    it('fails with invalid dataPath param', () => {
        assert.throws(() => new TracingReport({
            dataPath: './wowzers/idontexist/lol.md',
        }), "Data Path does not contain a valid directory path (must contain './' if meant to be current directory)");
    });

    it('succeeds without a dataPath param if reportPath is provided', () => {
        assert.doesNotThrow(() => new TracingReport({
            reportPath: './test/jest/artifacts/test.md',
        }), "Data Path does not contain a valid directory path (must contain './' if meant to be current directory)");
    });

    it('succeeds without a reportPath param if reportPath is provided', () => {
        assert.doesNotThrow(() => new TracingReport({
            dataPath: './test/jest/artifacts/test.md',
        }), "Report Path does not contain a valid directory path (must contain './' if meant to be current directory)");
    });
});

describe('Generation', () => {
    beforeEach(() => {
        dataResult = undefined;
        markdownResult = undefined;
    });

    it('generates a data file', () => {
        const report = new TracingReport({
            dataPath: `./test/jest/artifacts/test.json`,
            grayboxGlob: './test/jest/artifacts/testWdio.js',
            unitGlob: './test/jest/testUnit.js',
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        getReport(report);
        assert(dataResult, 'the data result is defined')
        assert.equal(markdownResult, undefined, 'the markdown result is NOT defined')
        snapshot(dataResult)
    });

    it('generates a markdown file', () => {
        const report = new TracingReport({
            reportPath: `./test/jest/artifacts/test.md`,
            grayboxGlob: './test/jest/artifacts/testWdio.js',
            unitGlob: './test/jest/testUnit.js',
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        getReport(report);
        assert(markdownResult, 'the markdown result is defined')
        assert.equal(dataResult, undefined, 'the data result is NOT defined')
        snapshot(markdownResult)
    });

    it('generates a markdown file AND a data file', () => {
        const report = new TracingReport({
            reportPath: `./test/jest/artifacts/test.md`,
            dataPath: `./test/jest/artifacts/test.json`,
            grayboxGlob: './test/jest/artifacts/testWdio.js',
            unitGlob: './test/jest/testUnit.js',
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        getReport(report);
        assert(markdownResult, 'the markdown result is defined')
        assert(dataResult, 'the data result is defined')

        snapshot(markdownResult)
        snapshot(dataResult)
    });


    ['id', 'name', 'issue', 'link', 'type'].forEach(sortKey => 
        it(`sorts by ${sortKey}`, () => {
            const report = new TracingReport({
                dataPath: `./test/jest/artifacts/test.json`,
                grayboxGlob: './test/jest/artifacts/testWdio.js',
                unitGlob: './test/jest/testUnit.js',
                sortKey,
                tags: {
                    name: 'test',
                    issue: 'jira',
                }
            });
    
            getReport(report);
            snapshot(dataResult)
        })
    )

    it('filters by issue', () => {
        const report = new TracingReport({
            dataPath: `./test/jest/artifacts/test.json`,
            grayboxGlob: './test/jest/artifacts/testWdio.js',
            unitGlob: './test/jest/testUnit.js',
            sortKey: 'issue',
            filters: { issue: ['TRACE-1001'] },
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        getReport(report);
        snapshot(dataResult)
    })

    it('generates a report for typescript files', () => {
        const report = new TracingReport({
            dataPath: `./test/jest/artifacts/test.json`,
            grayboxGlob: './test/jest/artifacts/testWdio.ts',
            unitGlob: './test/jest/testUnit.ts',
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        getReport(report);
        snapshot(dataResult);
    })

    it('generates a report for blackbox globs', () => {
        const report = new TracingReport({
            dataPath: `./test/jest/artifacts/test.json`,
            blackboxGlob: './test/jest/artifacts/testWdio.ts',
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        getReport(report);
        snapshot(dataResult);
    })
})