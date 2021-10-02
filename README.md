# tracing-reporter-js

## Builds a tracing report from JsDoc-annotated tests


### Live Examples:
[mar-js](https://github.cerner.com/medication-record/mar-js/blob/master/tracing/report.md)
[medication-admin-js](https://github.cerner.com/curo/medication-admin-js/blob/master/tracing/report.md)

## Reason
There are multiple problems with traditional tracing, where project files are directly linked to requirements in jazz.
    1. The code may move around, causing the links to become misleading or to 404 completely.
    2. The person performing the tracing might have to search a very long file to find what they are looking for.
    3. It can be hard to read a complex test plan that is interspersed with complex code
    4. There is no way to view test plans for multiple projects in one location.

This tool aims to solve these problems by letting the location of tracing links be unchanging. If you link to the individual ID headers in the report then github will additionally auto-scroll you to that spot in the page. It is also possible to generate one report that spans multiple projects by customizing the config. This would be of use in an org-level doc site, e.g. [clinical-meds-development](https://pages.github.cerner.com/Medication-Administration/clinical-meds-development/home/apppackage-json/index)