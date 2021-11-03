import TestTable from "../../../src/models/TestTable";
import Test from '../../../src/models/Test';

const unitTest = new Test({ id: '1', name: 'Unit Test', link: '"../testUnit.js#L3",', issues: ['TEST-123'], shortLink: 'testUnit.js' , type: 'Unit' })
const grayboxTest = new Test({ id: '2', name: 'Graybox Test', link: '"../testGraybox.js#L3",', issues: ['TEST-223'], shortLink: 'testGraybox.js' , type: 'Graybox' })
const blackboxTest = new Test({ id: '3', name: 'Blackbox Test', link: '"../testBlackbox.js#L3",', issues: ['TEST-323'], shortLink: 'testBlackbox.js' , type: 'Blackbox' })

describe("getTests", () =>  {
  it('returns tests', () => {
    const table = new TestTable().add(unitTest);
    expect(table.getTests()).toEqual([unitTest])
  })
});

describe("id", () =>  {
  it('sets the ID', () => {
    const table = new TestTable().setId('1234567');
    expect(table.id).toEqual('1234567')
  });
});

describe("add", () =>  {
  it('adds single test', () => {
    const table = new TestTable().add(unitTest);
    expect(table.tests).toEqual([unitTest])
  })

  it('adds array of tests', () => {
    const table = new TestTable().add([unitTest, grayboxTest, blackboxTest]);
    expect(table.tests).toEqual([unitTest, grayboxTest, blackboxTest])
  })
});

describe("sort", () =>  {
  ['issues', 'link', 'name', 'type'].forEach(key => {
    it(`sorts by ${key}`, () => {
      const table = new TestTable().add([unitTest, grayboxTest, blackboxTest]);
      expect(table.sort(key).tests).toMatchSnapshot();
    })
  })
});

describe("count", () =>  {
  it('returns test count', () => {
    const table = new TestTable().add([unitTest, grayboxTest, blackboxTest]);
    expect(table.count()).toEqual(3);
  })
});