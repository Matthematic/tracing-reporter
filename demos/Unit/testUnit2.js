
describe('suite', () => {
    /**
     * @name test
     * @jira TRACE-2001, TRACE-2002
     * @traces 2000000 - A
     * @traces 2000000 - D
     * @traces 2000000 - C
     * @traces 2000000 - F
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @jira TRACE-2000
     * @traces 2000001 - B
     * @traces 2000001 - E
     * @traces 1509100 - This is a list
     *      1. thing 1
     *      2. thing 2
     *      3. *thing 3*
     *          4. thing 4
     */
    it('test', () => {
        expect(true).toEqual(true);
    });    
})