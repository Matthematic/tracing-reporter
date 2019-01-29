const TracingReport = require('../src/reporter');

const config = require(process.cwd() + '/' + process.argv[process.argv.indexOf('--config')+1]);
const reporter = new TracingReport(config);
reporter.build();