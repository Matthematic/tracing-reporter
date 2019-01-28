# tracing-reporter

##### Builds a tracing report from JsDoc-annotated tests

Takes a config object as a command line argument. Config options are:



##### top-level options
| option | description | default |
| --- | --- | --- |
| reportPath | path to write the report to | './tracing/report.md'
| wdioGlob | glob that returns wdio test filenames | 'tests/wdio/**/*.+(js\|jsx)' |
| unitGlob | glob that returns unit test filenames | tests/+(components\|Helpers)/*.test.+(js\|jsx) |
| issueHost | hostname for issue links | 'https://jira2.cerner.com/browse/' |
| tags | see [tags](#tags)

##### tags
| option | description | default |
| --- | --- | --- |
| name | tag for naming the comment block | 'requirement' |
| issue | tag for mapping an issue key | 'issue' |
| traces | tag for mapping a test plan | 'traces |


## example config:

```
{
	reportPath: './tracing/report.md',
	wdioGlob: 'tests/wdio/**/*.+(js|jsx)',
	unitGlob: 'tests/+(components|Helpers)/*.test.+(js|jsx)',
	issueHost: 'https://jira2.cerner.com/browse/',
	tags: {
		name: 'test',
		issue: 'jira',
		traces: 'traces',
	}
}
```


### Tests will need to be annotated with the tags from the config:

```javascript
    /**
     * @name requirement
     * @issue ABC-123
     * @traces 1234567 - Verify true equals true
     * @traces 2345678 - Verify true does not equal false
     */
     it('i am a test', () => {
       expect(true).toEqual(true);
       expect(true).not.toEqual(false);
     });
```

### The above test would generate the following report:

# Tracing Report 
#### Total: 2
| ID | Name | Issue | Source |
| --- | --- | --- | --- |
| 1234567 | <h6>Verify true equals true</h6> | [ABC-123](https://jira2.cerner.com/browse/ABC-123) | [Example.test.jsx#L43](../tests/components/Example.test.jsx#L43) 
| 2345678 | <h6>Verify true does not equal false</h6> | [ABC-123](https://jira2.cerner.com/browse/ABC-123) | [Example.test.jsx#L43](../tests/components/Example.test.jsx#L43) 
