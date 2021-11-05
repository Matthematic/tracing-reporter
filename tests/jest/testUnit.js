
describe('suite', () => {
    /**
     * @name test
     * @jira TRACE-1001, TRACE-1002
     * @traces 1000000, 1000001, 2000001 - A
     * @traces 1000000 - D
     * @traces 1000000 - C
     * @traces 1000000 - F
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name anotherName
     * @anotherIssue TRACE-1000
     * @traces 1000001 - B
     * @traces 1000001 - E
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