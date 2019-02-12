
describe('suite', () => {
    /**
     * @name test
     * @jira ABC-123
     * @traces 1234567 - Verify true equals true
     * @traces 2345678 - Verify true does not equal false
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @traces plain format should be supported
     */
    it('doesnt have a id - name format', () => {
        expect(true).toEqual(true);
    });

    
    
})