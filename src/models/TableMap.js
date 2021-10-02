import Test from './Test';
import Table from './TestTable';
import TestTable from './TestTable';
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

    add(thing) {
      if (thing instanceof Test) {
        if (!this.tables.find(t => t.id === thing.id)) {
            this.tables.push(new TestTable(thing.id).add(thing));
        }
        else {
            this.tables.find(t => t.id === thing.id).add(thing);
        }
      } else if (thing instanceof TestTable) {
        this.tables.push(thing);
      }
      else if (Array.isArray(thing)) {
        thing.forEach(t => this.add(t));
      }
      else {
          console.log("couldnt add", thing);
      }
      return this;
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
            rowCopy.issues = row.issues[i]; 
            dataCopy.push(new Test({...rowCopy}));
          }
        }
      });
  
      return dataCopy;
    }

    getTables() {
      return this.tables;
    }

    sort(key = 'id', direction = 'ascending') {
      this.tables.forEach(t => t.sort(key, direction)); // Sort each table
      this.tables = this.tables.sort((t1, t2) => Number(t1.id) < Number(t2.id) ? 1 : -1) // sort the list of tables in DESCENDING ID order
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