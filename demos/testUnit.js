
describe('suite', () => {
    /**
     * @name test
     * @jira TRACE-1001
     * @traces 1000000 - A
     * @traces 1000000 - D
     * @traces 1000000 - C
     * @traces 1000000 - F
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @jira TRACE-1000
     * @traces 1000001 - B
     * @traces 1000001 - E
     */
    it('test', () => {
        expect(true).toEqual(true);
    });
})