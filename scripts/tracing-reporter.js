const TracingReport = require('../lib/models/TracingReport');

if (process.argv.indexOf('--config') !== -1) {
    const idx = process.argv.indexOf('--config');
    const argConfig = require(process.cwd() + '/' + process.argv[process.argv.indexOf('--config')+1]);
    new TracingReport(argConfig).build();
}
else {
    try {
        const rootconfig = require(process.cwd() + '/' + 'tracing.config');
        new TracingReport(rootconfig).build();
    }
    catch(e) {
        console.error("Unable to find config", e)
    }
}
