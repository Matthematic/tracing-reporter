import Test from './Test';
import Table from './TestTable';
import TestTable from './TestTable';
import { CONSTANTS } from './Config';
const _ = require('underscore');


class TableMap {
    constructor(json) {
      this.tables = [];

      if (json && Array.isArray(json.tables)) {
        json.tables.forEach(x => {
          if (Array.isArray(x.tests)) {
            const table = new Table(x.id);
            x.tests.forEach(y => {
              table.add(new Test(y))
            });
            this.tables.push(table);
          }
        });
      }
    }

    add(thing, groupKey = 'id') {
      //console.log("adding")
      if (thing instanceof Test) {
        if (!this.tables.find(t => t.id === thing[groupKey].toString())) {
            //console.log("ADDING NEW TABLE", new TestTable(thing[groupKey].toString()).add(thing));
            this.tables.push(new TestTable(thing[groupKey].toString()).add(thing));
        }
        else {
            //console.log("ADDING TO TABLE", thing[groupKey].toString());
            this.tables.find(t => t.id === thing[groupKey].toString()).add(thing);
        }
      } else if (thing instanceof TestTable) {
        this.tables.push(thing);
      }
      else if (Array.isArray(thing)) {
        thing.forEach(t => this.add(t, groupKey));
      }
      else {
          console.log("couldnt add", thing);
      }
      return this;
    }

    tableBy(key = 'id') {
      //console.log('TABLEBY')
      const tests = key === 'issues' ? this.getTestsSplitByIssue() : this.getTests();
      //console.log('TESTSSPLITBYISSUE', tests);
      this.tables = [];
      this.add(tests, key);
    }

    getTests() {
        return _.flatten(this.tables.map(t => t.getTests()));
    }

    /**
     * Splits tests that have combined issues into separate tests e.g. [TRACE-1000, TRACE-1001] becomes [TRACE-1000] [TRACE-1001]
     * @param {array} data 
     */
    getTestsSplitByIssue() {
      let dataCopy = [];
      _.flatten(this.tables.map(t => t.getTests())).forEach(row => {
        if (row.issues.length < 2) {
          dataCopy.push(row);
        }
        else {
          for (let i = 0; i < row.issues.length; ++i) {
            const rowCopy = Object.assign({}, row);
            rowCopy.issues = [row.issues[i]]; 
            dataCopy.push(new Test({...rowCopy}));
          }
        }
      });
  
      return dataCopy;
    }

    getTables() {
      return this.tables;
    }

    sort(key = 'id', tableSortDirection = CONSTANTS.ASCENDING, sortDirection = CONSTANTS.ASCENDING) {
      this.tables.forEach(t => t.sort(key, tableSortDirection)); // Sort each table

      const descSort = (t1, t2) => Number(t1.id) < Number(t2.id) ? 1 : -1
      const ascSort = (t1, t2) => Number(t2.id) < Number(t1.id) ? 1 : -1

      this.tables = sortDirection === CONSTANTS.ASCENDING ? this.tables.sort(ascSort) : this.tables.sort(descSort);
      return this;
    }

    count() {
      return this.tables.length;
    }

    print() {
        this.tables.forEach((t) => {
            t.print();
        })
    }

}

export default TableMap;