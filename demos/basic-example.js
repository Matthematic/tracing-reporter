const TracingReport = require('../src/reporter');

new TracingReport({
    reportPath: 'demos/report.md',
    wdioGlob: 'demos/testWdio.js',
    unitGlob: 'demos/testUnit.js',
    sortKey: 'id',
    tags: {
        issue: 'jira',
    }
}).build();
