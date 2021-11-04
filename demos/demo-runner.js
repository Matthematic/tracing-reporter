const TracingReport = require('../lib/models/TracingReport');

// ['name', 'issues', 'link', 'type'].forEach(tableSortKey => 
//     new TracingReport({
//         reportPath: `demos/reports/sort_by_${tableSortKey}.md`,
//         dataPath: `demos/reports/data_sort_by_${tableSortKey}.json`,
//         types: {
//             Graybox: 'demos/Graybox/**/*.js',
//             Blackbox: 'demos/Blackbox/**/*.js',
//             Unit: 'demos/Unit/**/*.js',
//         },
//         tableSortKey,
//         tags: {
//             name: 'test',
//             issue: 'jira',
//         }
//     }).build()
// );

// new TracingReport({
//     reportPath: `demos/reports/filter_by_issues.md`,
//     dataPath: `demos/reports/data_filter_by_issues.json`,
//     types: {
//         Graybox: 'demos/Graybox/**/*.js',
//         Blackbox: 'demos/Blackbox/**/*.js',
//         Unit: 'demos/Unit/**/*.js',
//     },
//     tableSortKey: 'name',
//     filter: ({ issues }) => issues.includes('TRACE-1001'),
//     tags: {
//         name: 'test',
//         issue: 'jira',
//     },
// }).build();

// new TracingReport({
//     reportPath: `demos/reports/long_report.md`,
//     dataPath: `demos/reports/data_long_report.json`,
//     types: {
//         Unit: 'demos/Unit/testUnitLong.ts',
//     },
//     tags: {
//         name: 'test',
//         issue: 'jira',
//     },
// }).build();

new TracingReport({
    dataPath: `demos/reports/data_aggregated.json`,
    reportPath: `demos/reports/aggregated.md`,
    dataFiles: [
        'demos/reports/data_long_report.json',
        'demos/reports/nodata_filter_by_issues.json',
        'demos/reports/nodata_sort_by_issues.json',
        'demos/reports/nodata_sort_by_link.json',
        'demos/reports/nodata_sort_by_name.json',
        'demos/reports/nodata_sort_by_type.json',
    ]
}).build();