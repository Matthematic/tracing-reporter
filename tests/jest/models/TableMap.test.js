import TableMap from "../../../src/models/TableMap";
import Test from "../../../src/models/Test";
import TestTable from "../../../src/models/TestTable";

const unitTest = new Test({ id: '1', name: 'Unit Test', link: '"../testUnit.js#L3",', issues: ['TEST-123', 'TEST2-123'], shortLink: 'testUnit.js' , type: 'Unit' })
const grayboxTest = new Test({ id: '2', name: 'Graybox Test', link: '"../testGraybox.js#L3",', issues: ['TEST-223', 'TEST2-223'], shortLink: 'testGraybox.js' , type: 'Graybox' })
const blackboxTest = new Test({ id: '3', name: 'Blackbox Test', link: '"../testBlackbox.js#L3",', issues: ['TEST-323', 'TEST2-323'], shortLink: 'testBlackbox.js' , type: 'Blackbox' })
const unitTestTable = new TestTable().add([unitTest]);
const grayboxTestTable = new TestTable().add([grayboxTest]);
const blackboxTestTable = new TestTable().add([blackboxTest]);

describe("constructor", () => {
    it('constructs from json', () => {
        const map = new TableMap({
            "tables": [{
              "id": "1000000",
              "tests": [
                {
                  "id": "1000000",
                  "name": "A",
                  "link": "../testUnit.js#L3",
                  "issues": [
                    "TEST-1001",
                    "TEST-1002"
                  ],
                  "shortLink": "testUnit.js",
                  "type": "Unit"
                }
              ]
            }]
        });

        expect(map.tables).toMatchSnapshot();
    });
});

describe('add', () => {
    it('adds test to existing table', () => {
        const map = new TableMap({
            "tables": [{
              "id": "1",
              "tests": []
            }]
        });
        expect(map.add(unitTest).tables).toMatchSnapshot();
    });

    it('adds test to new table', () => {
        const map = new TableMap();
        expect(map.add(grayboxTest).tables).toMatchSnapshot();
    });

    it('adds single table', () => {
        const map = new TableMap();
        expect(map.add(unitTestTable).tables).toMatchSnapshot();
    });

    it('adds multiple tests to existing table', () => {
        const map = new TableMap({
            "tables": [{
              "id": "1",
              "tests": []
            }]
        });
        expect(map.add([unitTest, unitTest, unitTest]).tables).toMatchSnapshot();
    });

    it('adds multiple tests to new table', () => {
        const map = new TableMap();
        expect(map.add([grayboxTest, grayboxTest, grayboxTest]).tables).toMatchSnapshot();
    });

    it('adds multiple tests to multiple new tables', () => {
        const map = new TableMap();
        expect(map.add([unitTest, grayboxTest, blackboxTest]).tables).toMatchSnapshot();
    });

    it('adds multiple tables', () => {
        const map = new TableMap();
        expect(map.add([unitTestTable, grayboxTestTable, blackboxTestTable]).tables).toMatchSnapshot();
    });
})

describe('getTests', () => {
    it('returns flattened list of tests', () => {
        const map = new TableMap().add([unitTestTable, grayboxTestTable, blackboxTestTable])
        expect(map.getTests()).toMatchSnapshot();
    })
})

describe('getTestsSplitByIssue', () => {
    it('splits tests that have combined issues into separate tests', () => {
        const map = new TableMap().add([unitTestTable, grayboxTestTable, blackboxTestTable])
        expect(map.getTestsSplitByIssue()).toMatchSnapshot();
    })
})

describe('getTables', () => {
    it('returns tables', () => {
        const map = new TableMap().add([unitTestTable, grayboxTestTable, blackboxTestTable])
        expect(map.getTables()).toEqual([unitTestTable, grayboxTestTable, blackboxTestTable]);
    })
})

describe('sort', () => {
    ['issue', 'id', 'link', 'name', 'type'].forEach(key => {
        it(`sorts each table by ${key}`, () => {
            const table = new TestTable(1).add([unitTest, grayboxTest, blackboxTest]);
            const map = new TableMap().add([table, new TestTable().clone(table).setId(2), new TestTable().clone(table).setId(3)])
            expect(map.sort(key).tables).toMatchSnapshot();
        })
    });

    it('sorts list of tables in ascending id order', () => {
        const table = new TestTable(1).add([unitTest, grayboxTest, blackboxTest]);
        const map = new TableMap().add([table, new TestTable().clone(table).setId(2), new TestTable().clone(table).setId(3)])
        expect(map.sort(undefined, undefined, 1).tables).toMatchSnapshot();
    });

    it('sorts list of tables in descending id order', () => {
        const table = new TestTable().add([unitTest, grayboxTest, blackboxTest]);
        const map = new TableMap().add([table, new TestTable().clone(table).setId(2), new TestTable().clone(table).setId(3)])
        expect(map.sort(undefined, undefined, -1).tables).toMatchSnapshot();
    });
})

describe('count', () => {
    it('returns table count', () => {
        const map = new TableMap().add([unitTestTable, grayboxTestTable, blackboxTestTable])
        expect(map.count()).toEqual(3);
    })
})