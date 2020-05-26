const TracingReport = require('../src/reporter');

['id', 'name', 'issue', 'link', 'type'].forEach(sortKey => 
    new TracingReport({
        reportPath: `demos/sort_by_${sortKey}.md`,
        dataPath: `demos/data_sort_by_${sortKey}.json`,
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
    dataPath: `demos/data_filter_by_issue.json`,
    grayboxGlob: 'demos/testWdio.js',
    unitGlob: 'demos/testUnit.js',
    sortKey: 'issue',
    filters: { issue: ['TRACE-1001'] },
    tags: {
        name: 'test',
        issue: 'jira',
    }
}).build();