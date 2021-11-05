
describe('suite', () => {
    /**
     * @name test
     * @jira TRACE-1001, TRACE-1002
     * @traces 1000000 - AA
     * @traces 1000000 - DD
     * @traces 1000000 - CC
     * @traces 1000000 - FF
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @jira TRACE-1000
     * @traces 1000001 - BB
     * @traces 1000001 - EE
     * @traces 1509100 - This is a blackbox list
     *      1. thing 1
     *      2. thing 2
     *      3. *thing 3*
     *          4. thing 4
     */
    it('test', () => {
        expect(true).toEqual(true);
    });    
})