const TracingReport = require('../src/reporter');

['id', 'name', 'issue', 'link', 'type'].forEach(sortKey => 
    new TracingReport({
        reportPath: `demos/sort_by_${sortKey}.md`,
        grayboxGlob: 'demos/testWdio.js',
        unitGlob: 'demos/testUnit.js',
        sortKey,
        tags: {
            name: 'test',
            issue: 'jira',
        }
    }).build()
);

new TracingReport({
    reportPath: `demos/filter_by_issue.md`,
    grayboxGlob: 'demos/testWdio.js',
    unitGlob: 'demos/testUnit.js',
    sortKey: 'issue',
    filters: { issue: ['TRACE-1001'] },
    tags: {
        name: 'test',
        issue: 'jira',
    }
}).build()