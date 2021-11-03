import Config from "../../../src/models/Config";

describe("get", function () {
  it("returns default config", () => {
    const config = new Config();
    expect(config.get()).toMatchInlineSnapshot(`
      Object {
        "dataPath": undefined,
        "filter": [Function],
        "issueHost": "https://jira2.cerner.com/browse/",
        "matcher": [Function],
        "reportPath": undefined,
        "silent": false,
        "sortDirection": "ascending",
        "sortKey": "name",
        "tags": Object {
          "issue": "issue",
          "name": "requirement",
          "traces": "traces",
        },
        "types": undefined,
        "verbose": false,
      }
    `);
  });

  it("returns custom config", () => {
    const config = new Config({
      reportPath: "custom",
      dataPath: "custom",
      types: {
        Graybox: "custom",
        Blackbox: "custom",
        Unit: "custom",
      },
      issueHost: "custom",
      sortKey: "custom",
      tags: {
        name: "custom",
        issue: "custom",
        traces: "custom",
      },
    });
    expect(config.get()).toMatchInlineSnapshot(`
      Object {
        "dataPath": "custom",
        "filter": [Function],
        "issueHost": "custom",
        "matcher": [Function],
        "reportPath": "custom",
        "silent": false,
        "sortDirection": "ascending",
        "sortKey": "custom",
        "tags": Object {
          "issue": "custom",
          "name": "custom",
          "traces": "custom",
        },
        "types": Object {
          "Blackbox": "custom",
          "Graybox": "custom",
          "Unit": "custom",
        },
        "verbose": false,
      }
    `);
  });
});

describe("validate", () => {
  it("default config is invalid", () => {
    const config = new Config();
    expect(() => config.validate()).toThrow(
      "Expected property `types` to be of type `object` but received type `undefined`\nExpected object `types` to not be empty, got `undefined` in object"
    );
  });

  it("throws on invalid reportPath", () => {
    const config = new Config({
      reportPath: 5,
    });
    expect(() => config.validate()).toThrow(
      "Expected property `reportPath` to be of type `string` but received type `number` in object"
    );
  });

  it("throws on invalid dataPath", () => {
    const config = new Config({
      dataPath: 5,
    });
    expect(() => config.validate()).toThrow(
      "Expected property `dataPath` to be of type `string` but received type `number` in object"
    );
  });
});
