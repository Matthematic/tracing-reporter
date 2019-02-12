var assert = require('assert');
var TracingReport = require('../src/reporter');

describe('getSortedMap', function() {
    let testMap;
    let instance;
    before(() => {
        instance = new TracingReport();
        testMap = [];

        for (let i = 1; i <= 40; i += 2) {
            testMap.push({ id: `${i}`, name: `test name ${i}`, link: '',  issue: '', shortLink: '', type: '' });
        }

        instance.tests = testMap.reverse().map(row => Object.assign({}, row));
    });

    it('should return a sorted map', function() {
        let sorted = instance.getSortedMap();

        for (let i = 1, x = 0; i <= 40; i += 2, x++) {
            assert.equal(sorted[x].id, `${i}`);
        }
    });
});