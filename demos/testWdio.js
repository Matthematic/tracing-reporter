
describe('suite', () => {
    /**
     * @name requirement
     * @jira ABC-123
     * @traces 12345 - This is a webdriver test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name requirement
     * @traces plain format should be supported
     */
    it('doesnt have a id - name format', () => {
        expect(true).toEqual(true);
    })
})