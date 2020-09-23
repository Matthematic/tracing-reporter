exports['Generation generates a data file 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation generates a markdown file 1'] = `
#### Total: 7 (Unit: 7 Graybox: 0 )


### 1000000

| Name (4) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>A</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |
| <h6>D</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |
| <h6>C</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |
| <h6>F</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |

<hr/>

### 1000001

| Name (2) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>B</h6> | [testUnit.js](.././test/jest/testUnit.js#L15) | [TRACE-1000](https://jira2.cerner.com/browse/TRACE-1000) | Unit |
| <h6>E</h6> | [testUnit.js](.././test/jest/testUnit.js#L15) | [TRACE-1000](https://jira2.cerner.com/browse/TRACE-1000) | Unit |

<hr/>

### 1509100

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>This is a list<br/>&nbsp;&nbsp;&nbsp;&nbsp; 1. thing 1<br/>&nbsp;&nbsp;&nbsp;&nbsp; 2. thing 2<br/>&nbsp;&nbsp;&nbsp;&nbsp; 3. \\*thing 3\\*<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. thing 4</h6> | [testUnit.js](.././test/jest/testUnit.js#L15) | [TRACE-1000](https://jira2.cerner.com/browse/TRACE-1000) | Unit |

<hr/>
`

exports['Generation generates a markdown file AND a data file 1'] = `
#### Total: 7 (Unit: 7 Graybox: 0 )


### 1000000

| Name (4) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>A</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |
| <h6>D</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |
| <h6>C</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |
| <h6>F</h6> | [testUnit.js](.././test/jest/testUnit.js#L3) | [TRACE-1001](https://jira2.cerner.com/browse/TRACE-1001)<br/>[TRACE-1002](https://jira2.cerner.com/browse/TRACE-1002) | Unit |

<hr/>

### 1000001

| Name (2) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>B</h6> | [testUnit.js](.././test/jest/testUnit.js#L15) | [TRACE-1000](https://jira2.cerner.com/browse/TRACE-1000) | Unit |
| <h6>E</h6> | [testUnit.js](.././test/jest/testUnit.js#L15) | [TRACE-1000](https://jira2.cerner.com/browse/TRACE-1000) | Unit |

<hr/>

### 1509100

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>This is a list<br/>&nbsp;&nbsp;&nbsp;&nbsp; 1. thing 1<br/>&nbsp;&nbsp;&nbsp;&nbsp; 2. thing 2<br/>&nbsp;&nbsp;&nbsp;&nbsp; 3. \\*thing 3\\*<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4. thing 4</h6> | [testUnit.js](.././test/jest/testUnit.js#L15) | [TRACE-1000](https://jira2.cerner.com/browse/TRACE-1000) | Unit |

<hr/>
`

exports['Generation generates a markdown file AND a data file 2'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation sorts by id 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation sorts by name 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation sorts by issue 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation sorts by link 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation sorts by type 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1000001": [
    {
      "name": "B",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "E",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ],
  "1509100": [
    {
      "name": "This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4",
      "link": ".././test/jest/testUnit.js#L15",
      "issues": [
        "TRACE-1000"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`

exports['Generation filters by issue 1'] = `
{
  "1000000": [
    {
      "name": "A",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "D",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "C",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    },
    {
      "name": "F",
      "link": ".././test/jest/testUnit.js#L3",
      "issues": [
        "TRACE-1001",
        "TRACE-1002"
      ],
      "shortLink": "testUnit.js",
      "type": "Unit"
    }
  ]
}
`
