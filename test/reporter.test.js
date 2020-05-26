var assert = require('assert');
var TracingReport = require('../src/reporter');

let result;
getReport = (instance) => {
    if (instance) {
        instance.append = (location, payload) => {
            if (location === instance.config.reportPath) {
                result = payload;
            }
        }

        instance.build();
        return result;
    }
} 

describe('placeholder', function() {
    beforeEach(() => {
        result = undefined;
    });

    it('generates a report', () => {
        const report = new TracingReport({
            reportPath: `./test/test.md`,
            dataPath: `./test/test.json`,
            grayboxGlob: './test/testWdio.js',
            unitGlob: './test/testUnit.js',
            tags: {
                name: 'test',
                issue: 'jira',
            }
        });

        assert(getReport(report), 'the result is defined')
    });
});