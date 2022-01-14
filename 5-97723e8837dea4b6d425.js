(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1111:function(e,t,s){},1115:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.propTypes=t.default=void 0;var i=n(s(62)),r=n(s(1)),a=n(s(3)),l=n(s(1112)),o=n(s(1114)),u=n(s(1120)),d=n(s(1123));s(1111),o.default.polyfill();var c={baseUrl:a.default.string.isRequired,data:a.default.array.isRequired};t.propTypes=c;var f=function(e){var t=e.baseUrl,s=e.data,n=new d.default(s),a=r.default.useState(n.getTestsSplitByIssue()),o=(0,i.default)(a,1)[0],c=r.default.useState(n.getTests()),f=(0,i.default)(c,1)[0],p=r.default.useState(!1),m=(0,i.default)(p,1)[0],h=r.default.useMemo((function(){return[{Header:"ID",accessor:"id",Cell:function(e){var t=e.cell.value;return t?r.default.createElement("div",{className:"markdown-wrapper"},r.default.createElement(l.default,{id:"TracingReport",src:t})):null}},{Header:"Name",accessor:"name",Cell:function(e){var t=e.cell.value;return t?r.default.createElement("div",{className:"markdown-wrapper"},r.default.createElement(l.default,{id:"TracingReport",src:t})):null}},{Header:"Location",accessor:"shortLink",Cell:function(e){return e.cell.value&&e.row.original?r.default.createElement("div",{className:"markdown-wrapper"},r.default.createElement(l.default,{id:"TracingReport",src:"[".concat(e.cell.value,"](").concat(e.row.original.link,")"),baseUrl:t+"/tree/master/tree/master"})):null}},{Header:"Issues",accessor:"issues",Cell:function(e){return Array.isArray(e.cell.value)?r.default.createElement("div",{className:"markdown-wrapper"},r.default.createElement(l.default,{id:"TracingReport",src:e.cell.value.map((function(e){return"[".concat(e,"](https://jira2.cerner.com/browse/").concat(e,")")})).join("\n")})):null}},{Header:"Type",accessor:"type",Cell:function(e){var t=e.cell.value;return t?r.default.createElement("div",{className:"markdown-wrapper"},r.default.createElement(l.default,{id:"TracingReport",src:t})):null}}]}),[]);return r.default.createElement(u.default,{columns:h,data:m?o:f})};f.propTypes=c;var p=f;t.default=p},1116:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=t.CONSTANTS=void 0;var i=n(s(94)),r=n(s(46)),a=n(s(51)),l=n(s(1129));function o(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function u(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?o(Object(s),!0).forEach((function(t){(0,i.default)(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):o(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var d=Object.freeze({DESCENDING:-1,ASCENDING:1});t.CONSTANTS=d;var c=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{tags:{}};(0,r.default)(this,e),this.config=u(u({reportPath:void 0,dataPath:void 0,types:void 0,matcher:function(e){return!!/^[0-9]+(,\s*[0-9]+)*\s*-\s*/.test(e)&&{id:e.slice(0,e.indexOf("-")).trim().split(",").map((function(e){return e.trim()})),name:e.slice(e.indexOf("-")+1).trim()}},filter:function(){return!0},issueHost:"https://jira2.cerner.com/browse/",sortDirection:d.ASCENDING,tableSortKey:"name",tableSortDirection:d.ASCENDING,verbose:!1,silent:!1},t),{},{tags:u({name:"requirement",issue:"issue",traces:"traces"},t.tags)})}return(0,a.default)(e,[{key:"get",value:function(){return this.config}},{key:"validate",value:function(){return(0,l.default)(this.config,l.default.object.exactShape({reportPath:l.default.optional.string.not.empty,dataPath:l.default.optional.string.not.empty,types:l.default.object.not.empty,matcher:l.default.function,filter:l.default.function,issueHost:l.default.optional.string.not.empty,tableSortKey:l.default.optional.any(l.default.string.equals("id"),l.default.string.equals("issues"),l.default.string.equals("link"),l.default.string.equals("name"),l.default.string.equals("type"),l.default.string.equals("shortLink")),tableSortDirection:l.default.optional.any(l.default.number.is((function(e){return e===d.ASCENDING})),l.default.number.is((function(e){return e===d.DESCENDING}))),sortDirection:l.default.optional.any(l.default.number.is((function(e){return e===d.ASCENDING})),l.default.number.is((function(e){return e===d.DESCENDING}))),silent:l.default.optional.boolean,tags:l.default.object.exactShape({name:l.default.optional.string.not.empty,issue:l.default.optional.string.not.empty,traces:l.default.optional.string.not.empty}),verbose:l.default.optional.boolean})),(0,l.default)(this.config.reportPath||this.config.dataPath,"reportPath OR dataPath",l.default.string.not.empty),this}}]),e}();t.default=c},1120:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(s(24)),r=n(s(1)),a=s(1118),l=n(s(1121)),o=n(s(1122)),u=function(e){e.reqId;var t=e.columns,s=e.data,n=r.default.useMemo((function(){return{minWidth:50,width:150,maxWidth:400}}),[]),u=(0,a.useTable)({columns:t,data:s,defaultColumn:n},a.useFilters,a.useGlobalFilter,a.useGroupBy,a.useSortBy,a.useExpanded,a.useResizeColumns),d=u.getTableProps;return r.default.createElement(r.default.Fragment,null,r.default.createElement("h1",null,"Tracing Report"),r.default.createElement("table",(0,i.default)({},d(),{style:{border:"solid 1px blue"}}),r.default.createElement(l.default,{tableInstance:u}),r.default.createElement(o.default,{tableInstance:u})))};t.default=u},1121:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(s(24)),r=n(s(62)),a=n(s(1)),l=(n(s(3)),s(1118)),o=(s(1131),function(e){var t=e.column;return t.canGroupBy?a.default.createElement("span",t.getGroupByToggleProps(),t.isGrouped?"⚍ ":"☰ "):null}),u=function(e){var t=e.column;e.onClick;return a.default.createElement("span",t.getSortByToggleProps(),t.isSorted?t.isSortedDesc?" ⇩":" ⇧":" ⇳")};function d(e){var t=e.preGlobalFilteredRows,s=e.globalFilter,n=e.setGlobalFilter,i=t.length,o=a.default.useState(s),u=(0,r.default)(o,2),d=u[0],c=u[1],f=(0,l.useAsyncDebounce)((function(e){n(e||void 0)}),500);return a.default.createElement("span",null,"Search:"," ",a.default.createElement("input",{value:d||"",onChange:function(e){c(e.target.value),f(e.target.value)},placeholder:"".concat(i," records..."),style:{fontSize:"1.1rem",border:"0"}}))}var c=function(e){var t=e.tableInstance,s=(t.getTableProps,t.getTableBodyProps,t.headerGroups),n=(t.rows,t.prepareRow,t.visibleColumns),r=t.preGlobalFilteredRows,l=t.setGlobalFilter,c=t.state,f=(c.groupBy,c.expanded,c.globalFilter);return a.default.createElement("thead",null,s.map((function(e){return a.default.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return a.default.createElement("th",(0,i.default)({},e.getHeaderProps(),{style:{borderBottom:"solid 3px red",background:"aliceblue",color:"black",fontWeight:"bold"}}),a.default.createElement(o,{column:e}),e.render("Header"),a.default.createElement(u,{column:e}))})))})),a.default.createElement("tr",null,a.default.createElement("th",{colSpan:n.length,style:{textAlign:"left"}},a.default.createElement(d,{preGlobalFilteredRows:r,globalFilter:f,setGlobalFilter:l}))))};t.default=c},1122:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(s(24)),r=n(s(1)),a=(n(s(1112)),n(s(3)),function(e){var t=e.tableInstance,s=(t.getTableProps,t.getTableBodyProps),n=(t.headerGroups,t.rows),a=t.prepareRow,l=(t.visibleColumns,t.preGlobalFilteredRows,t.setGlobalFilter,t.state),o=l.groupBy;l.expanded,l.globalFilter;return console.log("groupBy",o),r.default.createElement("tbody",s(),n.map((function(e){return a(e),r.default.createElement("tr",e.getRowProps(),e.cells.map((function(t){return r.default.createElement("td",(0,i.default)({},t.getCellProps(),{style:{padding:"10px",border:"solid 1px gray",borderRadius:"5px",background:t.isGrouped?"#fcad0380":"papayawhip",visibility:t.isPlaceholder||t.isAggregated?"hidden":"unset"}}),t.isGrouped?r.default.createElement("div",{style:{display:"flex"}},r.default.createElement("span",(0,i.default)({},e.getToggleRowExpandedProps(),{style:{"font-size":"20px",cursor:"pointer"}}),e.isExpanded?"↳":"→")," ",t.render("Cell"),r.default.createElement("span",null,"(",e.subRows.length,")")):t.isAggregated?t.render("Aggregated"):t.isPlaceholder?null:t.render("Cell"))})))})))});t.default=a},1123:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(s(94)),r=n(s(24)),a=n(s(46)),l=n(s(51)),o=n(s(1124)),u=n(s(1125)),d=s(1116);function c(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),s.push.apply(s,n)}return s}function f(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?c(Object(s),!0).forEach((function(t){(0,i.default)(e,t,s[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):c(Object(s)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))}))}return e}var p=s(1133),m=function(){function e(t){var s=this;(0,a.default)(this,e),this.tables=[],t&&Array.isArray(t.tables)&&t.tables.forEach((function(e){if(Array.isArray(e.tests)){var t=new u.default(e.id);e.tests.forEach((function(e){t.add(new o.default(e))})),s.tables.push(t)}}))}return(0,l.default)(e,[{key:"add",value:function(e){var t=this;return e instanceof o.default?this.tables.find((function(t){return t.id===e.id}))?this.tables.find((function(t){return t.id===e.id})).add(e):this.tables.push(new u.default(e.id).add(e)):e instanceof u.default?this.tables.push(e):Array.isArray(e)?e.forEach((function(e){return t.add(e)})):console.log("couldnt add",e),this}},{key:"getTests",value:function(){return p.flatten(this.tables.map((function(e){return e.getTests()})))}},{key:"getTestsSplitByIssue",value:function(){var e=[];return p.flatten(this.tables.map((function(e){return e.getTests()}))).forEach((function(t){if(t.issues.length<2)e.push(t);else for(var s=0;s<t.issues.length;++s){var n=(0,r.default)({},t);n.issues=t.issues[s],e.push(new o.default(f({},n)))}})),e}},{key:"getTables",value:function(){return this.tables}},{key:"sort",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"id",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:d.CONSTANTS.ASCENDING,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:d.CONSTANTS.ASCENDING;this.tables.forEach((function(s){return s.sort(e,t)}));var n=function(e,t){return Number(e.id)<Number(t.id)?1:-1},i=function(e,t){return Number(t.id)<Number(e.id)?1:-1};return this.tables=s===d.CONSTANTS.ASCENDING?this.tables.sort(i):this.tables.sort(n),this}},{key:"count",value:function(){return this.tables.length}},{key:"print",value:function(){this.tables.forEach((function(e){e.print()}))}}]),e}();t.default=m},1124:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(s(46)),r=n(s(51)),a=function(){function e(t){var s=t.id,n=t.name,r=t.link,a=t.issues,l=t.shortLink,o=t.type;(0,i.default)(this,e),this.id=s,this.name=n,this.link=r,this.issues=a,this.shortLink=l,this.type=o}return(0,r.default)(e,[{key:"print",value:function(){(this.id||this.name||this.type)&&console.log("".concat(this.id," - ").concat(this.name," ").concat(this.type," ").concat(this.issues.toString()))}}]),e}();t.default=a},1125:function(e,t,s){"use strict";var n=s(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n(s(46)),r=n(s(51)),a=s(1116),l=function(){function e(t){(0,i.default)(this,e),this.id=t,this.tests=[]}return(0,r.default)(e,[{key:"clone",value:function(e){return this.id=e.id,this.tests=JSON.parse(JSON.stringify(e.tests)),this}},{key:"getTests",value:function(){return this.tests}},{key:"setId",value:function(e){return this.id=e,this}},{key:"add",value:function(e){return Array.isArray(e)?this.tests=this.tests.concat(e):this.tests.push(e),this}},{key:"sort",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"id",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.CONSTANTS.ASCENDING;return this.tests.sort((function(e,t){return t.name===e.name?0:t.name<e.name?1:-1})),this.tests.sort((function(s,n){var i=s[e],r=n[e];return Array.isArray(s[e])&&(i=s[e].toString(),r=n[e].toString()),i===r?0:(t===a.CONSTANTS.DESCENDING?r>i:r<i)?1:-1})),this}},{key:"count",value:function(){return this.tests.length}},{key:"print",value:function(){this.tests.forEach((function(e){return e.print()}))}}]),e}();t.default=l},1160:function(e){e.exports=JSON.parse('{"tables":[{"id":"1000000","tests":[{"id":"1000000","name":"AA","link":"../demos/Blackbox/testBlackbox.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1000000","name":"CC","link":"../demos/Blackbox/testBlackbox.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1000000","name":"DD","link":"../demos/Blackbox/testBlackbox.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1000000","name":"FF","link":"../demos/Blackbox/testBlackbox.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1000000","name":"I","link":"../demos/Graybox/testWdio.js#L18","issues":["TRACE-1002"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000000","name":"K","link":"../demos/Graybox/testWdio.js#L18","issues":["TRACE-1002"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000000","name":"A","link":"../demos/Unit/testUnit.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testUnit.js","type":"Unit"},{"id":"1000000","name":"C","link":"../demos/Unit/testUnit.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testUnit.js","type":"Unit"},{"id":"1000000","name":"D","link":"../demos/Unit/testUnit.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testUnit.js","type":"Unit"},{"id":"1000000","name":"F","link":"../demos/Unit/testUnit.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testUnit.js","type":"Unit"}]},{"id":"1000001","tests":[{"id":"1000001","name":"BB","link":"../demos/Blackbox/testBlackbox.js#L15","issues":["TRACE-1000"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1000001","name":"EE","link":"../demos/Blackbox/testBlackbox.js#L15","issues":["TRACE-1000"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1000001","name":"G","link":"../demos/Graybox/testWdio.js#L3","issues":["TRACE-1003"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000001","name":"H","link":"../demos/Graybox/testWdio.js#L3","issues":["TRACE-1003"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000001","name":"I","link":"../demos/Graybox/testWdio.js#L3","issues":["TRACE-1002"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000001","name":"J","link":"../demos/Graybox/testWdio.js#L3","issues":["TRACE-1003"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000001","name":"K","link":"../demos/Graybox/testWdio.js#L3","issues":["TRACE-1002"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000001","name":"L","link":"../demos/Graybox/testWdio.js#L3","issues":["TRACE-1003"],"shortLink":"testWdio.js","type":"Graybox"},{"id":"1000001","name":"B","link":"../demos/Unit/testUnit.js#L16","issues":["TRACE-1000"],"shortLink":"testUnit.js","type":"Unit"},{"id":"1000001","name":"E","link":"../demos/Unit/testUnit.js#L16","issues":["TRACE-1000"],"shortLink":"testUnit.js","type":"Unit"},{"id":"1000001","name":"A","link":"../demos/Unit/testUnit.js#L3","issues":["TRACE-1001","TRACE-1002"],"shortLink":"testUnit.js","type":"Unit"}]},{"id":"1509100","tests":[{"id":"1509100","name":"This is a blackbox list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4","link":"../demos/Blackbox/testBlackbox.js#L15","issues":["TRACE-1000"],"shortLink":"testBlackbox.js","type":"Blackbox"},{"id":"1509100","name":"This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4","link":"../demos/Unit/testUnit.js#L16","issues":["TRACE-1000"],"shortLink":"testUnit.js","type":"Unit"},{"id":"1509100","name":"This is a list\\n     1. thing 1\\n     2. thing 2\\n     3. *thing 3*\\n         4. thing 4","link":"../demos/Unit/testUnit2.js#L15","issues":["TRACE-2000"],"shortLink":"testUnit2.js","type":"Unit"}]},{"id":"2000000","tests":[{"id":"2000000","name":"A","link":"../demos/Unit/testUnit2.js#L3","issues":["TRACE-2001","TRACE-2002"],"shortLink":"testUnit2.js","type":"Unit"},{"id":"2000000","name":"C","link":"../demos/Unit/testUnit2.js#L3","issues":["TRACE-2001","TRACE-2002"],"shortLink":"testUnit2.js","type":"Unit"},{"id":"2000000","name":"D","link":"../demos/Unit/testUnit2.js#L3","issues":["TRACE-2001","TRACE-2002"],"shortLink":"testUnit2.js","type":"Unit"},{"id":"2000000","name":"F","link":"../demos/Unit/testUnit2.js#L3","issues":["TRACE-2001","TRACE-2002"],"shortLink":"testUnit2.js","type":"Unit"}]},{"id":"2000001","tests":[{"id":"2000001","name":"B","link":"../demos/Unit/testUnit2.js#L15","issues":["TRACE-2000"],"shortLink":"testUnit2.js","type":"Unit"},{"id":"2000001","name":"E","link":"../demos/Unit/testUnit2.js#L15","issues":["TRACE-2000"],"shortLink":"testUnit2.js","type":"Unit"}]}]}')}}]);