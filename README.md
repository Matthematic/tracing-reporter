# tracing-reporter

## Builds a tracing report from JsDoc-annotated tests

## What?
Tracing is a testing concept in some industries that demand high testing evidence. If we as developers are given functional requirements, we will branch these into multiple tests to verify that functionality. *Tracing* is the idea of capturing the tests that verify your functional requirements so that you can easily reference them if challenged e.g. an audit scenario.

## Why?
There were multiple problems with traditional tracing in my company, where project files were directly linked to requirements in our internal requirement software.
    1. The code may move around with future code changes, causing the links to become misleading or to 404 completely.
    2. The person performing the tracing might have to search a very long file of code to find what they are looking for.
    3. It can be hard to read a complex test plan that is interspersed with complex code

## How?
This tool aims to solve these problems by generating a markdown report with *unchanging* links. If you link to the individual ID headers in the report then github will additionally auto-scroll you to that spot in the page. It is also possible to generate one report that spans multiple projects by customizing the config. This could be of use in an org-level doc site, for example.
