(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{1212:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return c}));var n=a(24),r=a.n(n),l=a(52),i=a.n(l),d=(a(1),a(654)),m=["components"],s={};function c(e){var t=e.components,a=i()(e,m);return Object(d.mdx)("wrapper",r()({},s,a,{components:t,mdxType:"MDXLayout"}),Object(d.mdx)("h1",{id:"tracing-reporter-js"},"tracing-reporter-js"),Object(d.mdx)("p",null,Object(d.mdx)("a",{parentName:"p",href:"https://jenkins.cerner.com/ion/job/Medication%20Administration/job/tracing-reporter-js/job/master/"},"![Build Status]","(https://jenkins.cerner.com/ion/buildStatus/icon?job=Medication Administration/tracing-reporter-js/master)")),Object(d.mdx)("blockquote",null,Object(d.mdx)("p",{parentName:"blockquote"},"This project Builds a viewable tracing report from JsDoc-annotated tests.")),Object(d.mdx)("h2",{id:"installation"},"Installation"),Object(d.mdx)("p",null,"To use this project, run the following command:"),Object(d.mdx)("pre",null,Object(d.mdx)("code",{parentName:"pre"},"npm install --save-dev tracing-reporter-js\n")),Object(d.mdx)("h3",{id:"usage"},"Usage:"),Object(d.mdx)("p",null,"The report will automatically look for a tracing.config.js file in your project. Optionally it can take a config as a command line argument. After installation, do the following steps to setup the report:"),Object(d.mdx)("ol",null,Object(d.mdx)("li",{parentName:"ol"},Object(d.mdx)("p",{parentName:"li"},"Populate tracing.config.js. An example is:"),Object(d.mdx)("pre",{parentName:"li"},Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},"module.exports =  {\n    reportPath: './tracing/report.md',\n    types: {\n        'Graybox': 'tests/wdio/**/*.+(js|jsx)',\n        'Unit': 'tests/jest/+(components|helpers)/**/*.test.+(js|jsx)',\n        'Special': [\n            'tests/wdio/edgecases/.+(js|jsx)',\n        ]\n    },\n    issueHost: 'https://jira2.cerner.com/browse/',\n    tags: {\n        name: 'test',\n        issue: 'jira',\n        traces: 'traces',\n    }\n};\n"))),Object(d.mdx)("li",{parentName:"ol"},Object(d.mdx)("p",{parentName:"li"},"Add an npm script that runs the cli command"),Object(d.mdx)("pre",{parentName:"li"},Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},'"scripts": {\n    "tracing-report": "tracing-reporter",\n}\n'))),Object(d.mdx)("li",{parentName:"ol"},Object(d.mdx)("p",{parentName:"li"},"Decide if you want to include a Report Viewer in your dev-site. The generated markdown file can be viewed in github, but\nif you want to view this in your terra-dev-site then you need to use either the ",Object(d.mdx)("a",{parentName:"p",href:"./components/markdown-viewer"},"MarkdownViewer")," or ",Object(d.mdx)("a",{parentName:"p",href:"./components/interactive-viewer"},"InteractiveViewer")," component."))),Object(d.mdx)("h3",{id:"config-options"},"Config options:"),Object(d.mdx)("h5",{id:"top-level-options"},"top-level options"),Object(d.mdx)("table",null,Object(d.mdx)("thead",{parentName:"table"},Object(d.mdx)("tr",{parentName:"thead"},Object(d.mdx)("th",{parentName:"tr",align:null},"option"),Object(d.mdx)("th",{parentName:"tr",align:null},"required"),Object(d.mdx)("th",{parentName:"tr",align:null},"description"),Object(d.mdx)("th",{parentName:"tr",align:null},"default"))),Object(d.mdx)("tbody",{parentName:"table"},Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},Object(d.mdx)("strong",{parentName:"td"},"reportPath")),Object(d.mdx)("td",{parentName:"tr",align:null},Object(d.mdx)("strong",{parentName:"td"},"true")),Object(d.mdx)("td",{parentName:"tr",align:null},"path to write the report to"),Object(d.mdx)("td",{parentName:"tr",align:null})),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"dataPath"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"path to write the data object to. This is required if you plan on using the ",Object(d.mdx)("a",{parentName:"td",href:"./components/interactive-viewer"},"InteractiveViewer")),Object(d.mdx)("td",{parentName:"tr",align:null})),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},Object(d.mdx)("strong",{parentName:"td"},"types")),Object(d.mdx)("td",{parentName:"tr",align:null},Object(d.mdx)("strong",{parentName:"td"},"true")),Object(d.mdx)("td",{parentName:"tr",align:null},'a key, value object where the key is the name of a "test type" and the value is the glob that matches those test files. Also supports an array of globs.'),Object(d.mdx)("td",{parentName:"tr",align:null})),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"matcher"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},Object(d.mdx)("em",{parentName:"td"},"use with caution")," the matching function for parsing the format of tests. Must return the shape { id: Array","[String]",", name: String }."),Object(d.mdx)("td",{parentName:"tr",align:null},'matches "1000',"[, 2000]",' - test name" format by default')),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"issueHost"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"hostname for issue links"),Object(d.mdx)("td",{parentName:"tr",align:null},"'",Object(d.mdx)("a",{parentName:"td",href:"https://jira2.cerner.com/browse/%27"},"https://jira2.cerner.com/browse/'"))),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"sortDirection"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"the direction that the tables are listed in the report. -1 for descending, 1 for ascending"),Object(d.mdx)("td",{parentName:"tr",align:null},"1")),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"tableSortKey"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"the name of the column that each individual table should sort by. e.g. 'name', 'issue', 'link', 'type'. (sorting tables by 'id' is, effectively, choosing not to sort them and thus they will sort in the order they appear in the code)"),Object(d.mdx)("td",{parentName:"tr",align:null},"'id'")),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"tableSortDirection"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"the direction that the tests in a single table will be sorted. -1 for descending, 1 for ascending"),Object(d.mdx)("td",{parentName:"tr",align:null},"1")),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"filter"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"the filtering function all tests are ran through."),Object(d.mdx)("td",{parentName:"tr",align:null},"see ",Object(d.mdx)("a",{parentName:"td",href:"#filter"},"filter"))),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"tags"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"lets you specify aliases for tag names e.g. 'jira' instead of 'issue'"),Object(d.mdx)("td",{parentName:"tr",align:null},"see ",Object(d.mdx)("a",{parentName:"td",href:"#tags"},"tags"))),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"verbose"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"outputs verbose logs"),Object(d.mdx)("td",{parentName:"tr",align:null})),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"silent"),Object(d.mdx)("td",{parentName:"tr",align:null},"false"),Object(d.mdx)("td",{parentName:"tr",align:null},"silences all console output"),Object(d.mdx)("td",{parentName:"tr",align:null})))),Object(d.mdx)("h5",{id:"filter"},"filter"),Object(d.mdx)("p",null,"the filter option should be a function which takes an object with the following properties: { id, name, link, issues, shortLink, type } and returns truthy if the test should be included. The default filter is ",Object(d.mdx)("inlineCode",{parentName:"p"},"() => true"),"\nFor example: "),Object(d.mdx)("pre",null,Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},"filter: ({ id, name }) => name.includes('scheduled medication') || id == '12345'\n")),Object(d.mdx)("h5",{id:"tags"},"tags"),Object(d.mdx)("table",null,Object(d.mdx)("thead",{parentName:"table"},Object(d.mdx)("tr",{parentName:"thead"},Object(d.mdx)("th",{parentName:"tr",align:null},"option"),Object(d.mdx)("th",{parentName:"tr",align:null},"description"),Object(d.mdx)("th",{parentName:"tr",align:null},"default"))),Object(d.mdx)("tbody",{parentName:"table"},Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"name"),Object(d.mdx)("td",{parentName:"tr",align:null},"tag for naming the comment block"),Object(d.mdx)("td",{parentName:"tr",align:null},"'requirement'")),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"issue"),Object(d.mdx)("td",{parentName:"tr",align:null},"tag for mapping an issue key"),Object(d.mdx)("td",{parentName:"tr",align:null},"'issue'")),Object(d.mdx)("tr",{parentName:"tbody"},Object(d.mdx)("td",{parentName:"tr",align:null},"traces"),Object(d.mdx)("td",{parentName:"tr",align:null},"tag for mapping a test plan"),Object(d.mdx)("td",{parentName:"tr",align:null},"'traces")))),Object(d.mdx)("h3",{id:"tests-will-need-to-be-annotated-with-the-tags-from-the-config"},"Tests will need to be annotated with the tags from the config:"),Object(d.mdx)("pre",null,Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},"    /**\n     * @name test\n     * @jira ABC-123\n     * @traces 1234567 - Verify true equals true\n     * @traces 2345678 - Verify true does not equal false\n     */\n     it('i am a test', () => {\n       expect(true).toEqual(true);\n       expect(true).not.toEqual(false);\n     });\n")),Object(d.mdx)("h3",{id:"advanced-usage"},"Advanced Usage"),Object(d.mdx)("h4",{id:"repeated-tests"},"Repeated Tests"),Object(d.mdx)("p",null,"The default matcher for test names supports multiple ID's. This can be useful if your requirements are branched in such a way that you will otherwise end up with multiple of the same tests but each reference a different requirement ID."),Object(d.mdx)("h6",{id:"example"},"example:"),Object(d.mdx)("pre",null,Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},"\n    // These two tests are equivalent\n\n    /**\n     * @name test\n     * @jira ABC-123\n     * @traces 1000 - Verify true equals true\n     * @traces 1001 - Verify true equals true\n     * @traces 1002 - Verify true equals true\n     * @traces 1003 - Verify true equals true\n     */\n    it('i am a test', () => {\n\n    });\n\n    /**\n     * @name test\n     * @jira ABC-123\n     * @traces 1000, 1001, 1002, 1003 - Verify true equals true\n     */\n    it('i am a test', () => {\n\n    });\n")),Object(d.mdx)("h4",{id:"issue-grouping"},"Issue Grouping"),Object(d.mdx)("p",null,"The issue tag (or your alias) is applied to every test under it until it detects another issue tag. This lets you group multiple tests in the same block to different issues."),Object(d.mdx)("h5",{id:"example-1"},"example:"),Object(d.mdx)("pre",null,Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},"    /**\n     * @name test\n     * @jira ABC-123\n     * @traces 1234567 - Verify true equals true\n     * @traces 2345678 - Verify true does not equal false\n     *\n     * @jira ABC-234\n     * @traces 3456789 - Verify 2+2 = 4\n     * @traces 4567890 - Verify 4-2 = 2\n     */\n    it('i am a test', () => {\n\n    });\n")),Object(d.mdx)("h4",{id:"indention"},"Indention"),Object(d.mdx)("p",null,'Github\'s markdown spec only supports a minimal amount of html tags, and all styling is stripped. This makes it difficult to keep the exact whitespace of the test plan as it is typed in the code while also supporting wrapping. Currently the tracing reporter supports indented lists, and the definition of an "indention" is a sequence of 4 spaces. These are replaced with '," "," entities in the report. "),Object(d.mdx)("h5",{id:"example-2"},"example:"),Object(d.mdx)("pre",null,Object(d.mdx)("code",{parentName:"pre",className:"language-javascript"},"    /**\n     * @name test\n     * @jira ABC-123\n     * @traces 1234567 - Verify this list is formatted\n     *     \\- I should be singly indented\n     *         \\- I should be doubly indented\n     *     \\- I should be singly indented\n     */\n    it('i am a test', () => {\n\n    });\n")),Object(d.mdx)("h3",{id:"notes"},"Notes:"),Object(d.mdx)("ol",null,Object(d.mdx)("li",{parentName:"ol"},"The reason the ",Object(d.mdx)("em",{parentName:"li"},"@name")," tag is necessary is because JsDoc by default only parses documentation when it detects definitions of new objects. In the case of mocha and jest tests, a test is not a definition, but actually a function call: ",Object(d.mdx)("em",{parentName:"li"},"it()"),". This means we need to use the @name tag to notify the parser to parse this block when it normally wouldn't."),Object(d.mdx)("li",{parentName:"ol"},"Some real-world examples of this report being used can be found ",Object(d.mdx)("a",{parentName:"li",href:"https://github.cerner.com/medication-record/mar-js/blob/master/tracing/report.md"},"here")," and ",Object(d.mdx)("a",{parentName:"li",href:"https://github.cerner.com/medication-record/mar-gantt-js/blob/master/tracing/report.md"},"here"),".")))}c.isMDXComponent=!0}}]);