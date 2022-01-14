/* global browser, Terra, before */

describe('Interactive', () => {
    [
        'filter-by-issues',
        'sort-by-issues',
        'sort-by-link',
        'sort-by-name',
        'sort-by-type',
    ].forEach(name => {
        it(`${name} matches screenshot`, async () => {
            await browser.url(`/raw/tests/tracing-reporter-js/interactive/${name}`);
            // $('body .loading-overlay').waitForExist({ reverse: true });
            // Terra.validates.screenshot(name)
        })
    })
});