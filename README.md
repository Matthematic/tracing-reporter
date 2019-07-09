# tracing-reporter

## Builds a tracing report from JsDoc-annotated tests


### Usage:
Takes a config object as a command line argument. Config options are:

##### top-level options
| option | description | default |
| --- | --- | --- |
| reportPath | path to write the report to | './tracing/report.md'
| grayboxGlob | glob that matches graybox test filenames | 'tests/wdio/**/*.+(js\|jsx)' |
| unitGlob | glob that matches unit test filenames | 'tests/+(components\|Helpers)/*.test.+(js\|jsx)' |
| issueHost | hostname for issue links | 'https://jira2.cerner.com/browse/' |
| sortKey | the name of the column that each individual table should sort by. e.g. 'id', 'name', 'issue', 'link', 'type'. (sorting tables by 'id' is, effectively, choosing not to sort them and thus they will sort in the order they appear in the code) | 'id' |
| tags | lets you specify aliases for tag names e.g. 'jira' instead of 'issue' | see [tags](#tags)

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
	grayboxGlob: 'tests/wdio/**/*.+(js|jsx)',
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
     * @jira ABC-123
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
#### Total: 2 (Unit: 0 Graybox: 2 )


<h3>1234567</h3>

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>Verify true equals true</h6> | [testWdio.js#L3](../demos/testWdio.js#L3) | [ABC-123](https://jira2.cerner.com/browse/ABC-123) | Graybox |
<hr/>

<h3>2345678</h3>

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>Verify true does not equal false</h6> | [testWdio.js#L3](../demos/testWdio.js#L3) | [ABC-123](https://jira2.cerner.com/browse/ABC-123) | Graybox |
<hr/>

<br />
<br />

### Advanced Usage
The issue tag (or your alias) is applied to every test under it until it detects another issue tag. This lets you group multiple tests in the same block to different issues.

#### example:
```javascript
    /**
     * @name requirement
     * @jira ABC-123
     * @traces 1234567 - Verify true equals true
     * @traces 2345678 - Verify true does not equal false
     * @jira ABC-234
     * @traces 3456789 - Verify 2+2 = 4
     * @traces 4567890 - Verify 4-2 = 2
     */
    it('i am a test', () => {

    });
```
### The above test would generate the following report:

<h3>1234567</h3>

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>Verify true equals true</h6> | [testUnit.js#L25](../demos/testUnit.js#L25) | [ABC-123](https://jira2.cerner.com/browse/ABC-123) | Unit |
<hr/>

<h3>2345678</h3>

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>Verify true does not equal false</h6> | [testUnit.js#L25](../demos/testUnit.js#L25) | [ABC-123](https://jira2.cerner.com/browse/ABC-123) | Unit |
<hr/>

<h3>3456789</h3>

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>Verify 2+2 = 4</h6> | [testUnit.js#L25](../demos/testUnit.js#L25) | [ABC-234](https://jira2.cerner.com/browse/ABC-234) | Unit |
<hr/>

<h3>4567890</h3>

| Name (1) | Link | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Issue&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Type |
| :--- | :---: | :---: | :---: |
| <h6>Verify 4-2 = 2</h6> | [testUnit.js#L25](../demos/testUnit.js#L25) | [ABC-234](https://jira2.cerner.com/browse/ABC-234) | Unit |
<hr/>

<br />
<br />

### Notes:
1. The reason the *@name* tag is necessary is because JsDoc by default only parses documentation when it detects definitions of new objects. In the case of mocha and jest tests, a test is not a definition, but actually a function call: *it()*. This means we need to use the @name tag to notify the parser to parse this block when it normally wouldn't.
2. Some real-world examples of this report being used can be found [here](https://github.cerner.com/medication-record/mar-js/blob/master/tracing/report.md) and [here](https://github.cerner.com/medication-record/mar-gantt-js/blob/master/tracing/report.md).
