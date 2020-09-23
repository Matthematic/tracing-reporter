/* global browser, Terra, before */

describe('Markdown', () => {
    describe('Filter By Issue', () => {
        before(() => {
            browser.refresh();
            browser.url('/#/raw/tests/tracing-reporter-js/markdown/filter-by-issue');
            browser.waitForExist('body .loading-overlay', global.browser.options.waitForTimeout, true);
        });
        Terra.it.matchesScreenshot();
    });

    describe('Sort By ID', () => {
        before(() => {
            browser.refresh();
            browser.url('/#/raw/tests/tracing-reporter-js/markdown/sort-by-id');
            browser.waitForExist('body .loading-overlay', global.browser.options.waitForTimeout, true);
        });
        Terra.it.matchesScreenshot();
    });

    describe('Sort By Issue', () => {
        before(() => {
            browser.refresh();
            browser.url('/#/raw/tests/tracing-reporter-js/markdown/sort-by-issue');
            browser.waitForExist('body .loading-overlay', global.browser.options.waitForTimeout, true);
        });
        Terra.it.matchesScreenshot();
    });

    describe('Sort By Link', () => {
        before(() => {
            browser.refresh();
            browser.url('/#/raw/tests/tracing-reporter-js/markdown/sort-by-link');
            browser.waitForExist('body .loading-overlay', global.browser.options.waitForTimeout, true);
        });
        Terra.it.matchesScreenshot();
    });

    describe('Sort By Name', () => {
        before(() => {
            browser.refresh();
            browser.url('/#/raw/tests/tracing-reporter-js/markdown/sort-by-name');
            browser.waitForExist('body .loading-overlay', global.browser.options.waitForTimeout, true);
        });
        Terra.it.matchesScreenshot();
    });

    describe('Sort By Type', () => {
        before(() => {
            browser.refresh();
            browser.url('/#/raw/tests/tracing-reporter-js/markdown/sort-by-type');
            browser.waitForExist('body .loading-overlay', global.browser.options.waitForTimeout, true);
        });
        Terra.it.matchesScreenshot();
    });
  });
  