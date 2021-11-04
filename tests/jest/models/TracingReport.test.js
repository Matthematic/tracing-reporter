import TracingReport from "../../../src/models/TracingReport";
import fs from 'fs';
const { readFile } = fs.promises;

async function getReport(config = {}) {
    const fileName = 'test-report';
    return new TracingReport({
        reportPath: `tests/jest/artifacts/${fileName}.md`,
        types: {
            'Graybox': 'tests/jest/testWdio.js',
            'Blackbox': 'tests/jest/testBlackbox.js',
            'Unit': 'tests/jest/testUnit.js',
        },
        ...config,
        tags: {
            name: 'test',
            issue: 'jira',
            ...config.tags
        },
        silent: true,
    })
    .build()
    .then(() => readFile(`tests/jest/artifacts/${fileName}.md`, { encoding: 'utf-8' }))
}

async function getData(config = {}) {
    const fileName = 'test-report';
    return new TracingReport({
        dataPath: `tests/jest/artifacts/${fileName}.json`,
        types: {
            'Graybox': 'tests/jest/testWdio.js',
            'Blackbox': 'tests/jest/testBlackbox.js',
            'Unit': 'tests/jest/testUnit.js',
        },
        ...config,
        tags: {
            name: 'test',
            issue: 'jira',
            ...config.tags
        },
        silent: true,
    })
    .build()
    .then(() => readFile(`tests/jest/artifacts/${fileName}.json`, { encoding: 'utf-8' }))
}

describe('TracingReport', () => {
    afterAll(() => {
        if (fs.existsSync('tests/jest/artifacts/')) {
            fs.rmdirSync('tests/jest/artifacts/', {recursive: true})
        }
    })
    it('builds report for JS files', () => {
        return getReport().then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('builds data file for JS files', () => {
        return getData().then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('builds report for TS files', () => {
        return getReport({
            types: {
                'Graybox': 'tests/jest/testWdio.ts',
                'Blackbox': 'tests/jest/testBlackbox.ts',
                'Unit': 'tests/jest/testUnit.ts',
            },
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('builds data file for TS files', () => {
        return getData({
            types: {
                'Graybox': 'tests/jest/testWdio.ts',
                'Blackbox': 'tests/jest/testBlackbox.ts',
                'Unit': 'tests/jest/testUnit.ts',
            },
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('only considers test blocks with the specified name', async () => {
        return getReport({ 
            tags: {
                name: 'anotherName',
            }
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('only populates the issue column for tests with the specified issue tag', async () => {
        return getReport({ 
            tags: {
                issue: 'anotherIssue',
            }
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('only considers test plans with the specified tag', async () => {
        return getReport({ 
            tags: {
                traces: 'plan',
            }
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    it('only considers test plans in the specified file globs', async () => {
        return getReport({ 
            types: {
                'Blackbox': ''
            }
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });
    
    ['name', 'issues', 'link', 'type'].forEach(tableSortKey => {
        it(`sorts by ${tableSortKey}`, async () => {
            return getReport({ 
                tableSortKey
            }).then(report => {
                expect(report).toMatchSnapshot();
            });
        });
    });

    it('prepends issues with issueHost', () => {
        return getReport({ 
            issueHost: 'http://google.com'
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });

    [
        { key: 'issues', value: ({ issues }) => issues.includes('TRACE-1001') },
    ].forEach(({ key, value }) => {
        it(`filters by ${key}`, async () => {
            return getReport({ 
                filter: value
            }).then(report => {
                expect(report).toMatchSnapshot();
            });
        });
    });

    it('splits multiple IDs into separate tests', async () => {
        return getReport({ 
            types: {
                'Unit': 'tests/jest/testUnit.js',
            },
        }).then(report => {
            expect(report).toMatchSnapshot();
        });
    });
});
