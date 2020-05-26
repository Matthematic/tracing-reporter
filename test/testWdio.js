
describe('suite', () => {
    /**
     * @name test
     * @jira TRACE-1003
     * @traces 1000001 - G
     * @traces 1000001 - H
     * @traces 1000001 - J
     * @traces 1000001 - L
     * @jira TRACE-1002
     * @traces 1000001 - I
     * @traces 1000001 - K
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @jira TRACE-1002
     * @traces 1000000 - I
     * @traces 1000000 - K
     */
    it('test', () => {
        expect(true).toEqual(true);
    });
})