import Config from "../../../src/models/Config";
import Test from "../../../src/models/Test";
import TableMap from "../../../src/models/TableMap";
import Printer from "../../../src/models/Printer";
const { fs, vol } = require('memfs');
jest.mock('fs');

const getFile = (path = '') => {
    return vol.toJSON()[process.cwd() + '/' + path]
}

describe("checkDir", () => {
    beforeEach(() => {
        vol.reset();
    })

    it('throws on non-absolute path', () => {
        expect(() => Printer.checkDir('report.test.md')).toThrow('Path does not contain a /. Double check that the path is absolute');
    });

    it('throws on invalid path', () => {
        expect(() => Printer.checkDir(123)).toThrow('path must be a non-empty string');
    });

    it('throws on empty path', () => {
        expect(() => Printer.checkDir()).toThrow('path must be a non-empty string');
    });

    it('creates top-level file', () => {
        Printer.checkDir(process.cwd() + '/report.test.md');
        expect(getFile('report.test.md')).toEqual('');
    });

    it('creates file and folders', () => {
        Printer.checkDir(process.cwd() + '/folder1/folder2/report.test.md');
        expect(getFile('folder1/folder2/report.test.md')).toEqual('');
    });
});

describe("clearPath", () => {
    beforeEach(() => {
        vol.reset();
        const json = {};
        json[process.cwd() + '/report.test.md'] = '#### Total: 29 (Unit: 14 Graybox: 8 Blackbox: 7 )'; // an existing report file
        vol.fromJSON(json);
    });

    it('throws on invalid path', () => {
        expect(() => Printer.checkDir(1234)).toThrow('path must be a non-empty string');
    });

    it('throws on empty path', () => {
        expect(() => Printer.checkDir('')).toThrow('path must be a non-empty string');
    });

    it('clears file', () => {
        Printer.checkDir(process.cwd() + '/report.test.md');
        expect(getFile('report.test.md')).toEqual('');
    });
});

describe("append", () => {
    beforeEach(() => {
        vol.reset();
        const json = {};
        json[process.cwd() + '/report.test.md'] = '#### Total: 29 (Unit: 14 Graybox: 8 Blackbox: 7 )'; // an existing report file
        vol.fromJSON(json);
    });

    it('throws on invalid path', () => {
        expect(() => Printer.append(1234, 'foo bar')).toThrow('path must be a non-empty string');
    });

    it('throws on empty path', () => {
        expect(() => Printer.append('', 'foo bar')).toThrow('path must be a non-empty string');
    });

    it('appends to file', () => {
        Printer.append(process.cwd() + '/report.test.md', '\nfoo bar');
        expect(getFile('report.test.md')).toEqual('#### Total: 29 (Unit: 14 Graybox: 8 Blackbox: 7 )\nfoo bar');
    });
});

describe("printMarkdown", () => {
    beforeEach(() => {
        vol.reset();
        const json = {};
        json[process.cwd() + '/printer.test.md'] = '';
        vol.fromJSON(json);
    })

    it('prints the markdown file', () => {
        const config = new Config({
            reportPath: process.cwd() + `/printer.test.md`,
        });

        const tests = [
            new Test({
              "id": "1000000",
              "name": "A",
              "link": "../demos/Unit/testUnit.js#L3",
              "issues": [
                "TRACE-1001",
                "TRACE-1002"
              ],
              "shortLink": "testUnit.js",
              "type": "Unit"
            }),
            new Test({
              "id": "1000000",
              "name": "D",
              "link": "../demos/Unit/testUnit.js#L3",
              "issues": [
                "TRACE-1001",
                "TRACE-1002"
              ],
              "shortLink": "testUnit.js",
              "type": "Unit"
            }),
            new Test({
              "id": "1000000",
              "name": "C",
              "link": "../demos/Unit/testUnit.js#L3",
              "issues": [
                "TRACE-1001",
                "TRACE-1002"
              ],
              "shortLink": "testUnit.js",
              "type": "Unit"
            })
        ]

        const tableMap = new TableMap().add(tests);
        Printer.printMarkdown(config.get(), tableMap);
        expect(getFile('printer.test.md')).toMatchSnapshot();
    });
});

describe("printData", () => {
    beforeEach(() => {
        vol.reset();
        const json = {};
        json[process.cwd() + '/printer.json'] = '';
        vol.fromJSON(json);
    })

    it('prints the data file', () => {
        const config = new Config({
            dataPath: process.cwd() + `/printer.json`,
        });

        const tests = [
            new Test({
              "id": "1000000",
              "name": "A",
              "link": "../demos/Unit/testUnit.js#L3",
              "issues": [
                "TRACE-1001",
                "TRACE-1002"
              ],
              "shortLink": "testUnit.js",
              "type": "Unit"
            }),
            new Test({
              "id": "1000000",
              "name": "D",
              "link": "../demos/Unit/testUnit.js#L3",
              "issues": [
                "TRACE-1001",
                "TRACE-1002"
              ],
              "shortLink": "testUnit.js",
              "type": "Unit"
            }),
            new Test({
              "id": "1000000",
              "name": "C",
              "link": "../demos/Unit/testUnit.js#L3",
              "issues": [
                "TRACE-1001",
                "TRACE-1002"
              ],
              "shortLink": "testUnit.js",
              "type": "Unit"
            })
        ]

        const tableMap = new TableMap().add(tests);
        Printer.printData(config.get(), tableMap);
        expect(getFile('printer.json')).toMatchSnapshot();
    });
});
