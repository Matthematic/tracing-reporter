import { CONSTANTS } from './Config';

/**
 * Represents a single table of tests mapped to a requirement ID
 * 
 * e.g. "1000000": [
    {
      "name": "AA",
      "link": "../demos/Blackbox/testBlackbox.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testBlackbox.js",
      "type": "Blackbox"
    },
    ...
  ]
 */
class Table {
    constructor(id) {
      this.id = id;
      this.tests = [];
      this.count = this.tests.length;
    }

    // intended for testing
    clone(table) {
      this.id = table.id;
      this.tests = JSON.parse(JSON.stringify(table.tests));
      return this;
    }

    getTests() {
      return this.tests;
    }

    setId(x) {
      this.id = x;
      return this;
    }

    add(tests) {
      if (Array.isArray(tests)) {
        this.tests = this.tests.concat(tests)
      }
      else {
        this.tests.push(tests);
      }
      this.count = this.tests.length;
      return this;
    }

    sort(key = 'id', direction = CONSTANTS.ASCENDING) {
      this.tests.sort((a, b) => (b.name === a.name) ? 0 : (b.name < a.name) ? 1 : -1) // sort by name first
      this.tests.sort((a, b) => {
          let x = a[key];
          let y = b[key];

          if (Array.isArray(a[key])) { // issues are an array so we need to stringify
            x = a[key].toString();
            y = b[key].toString();
          }

          if (x === y) {
            return 0;
          }

          const compare = direction === CONSTANTS.DESCENDING ? (y > x) : (y < x);
          return compare ? 1 : -1
        });
      return this;
    }

    count() {
      return this.tests.length;
    }

    print() {
      this.tests.forEach(t => t.print());
    }

}

export default Table;