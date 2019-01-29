
describe('suite', () => {
    /**
     * @name requirement
     * @jira ABC-123, DEF-456
     * @traces 12345 - aThis is a unit test
     * @jira GHI-789
     * @traces 67890 - dthis is another unit test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name requirement
     * @traces 678318 - cthis is a third unit test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name requirement
     * @jira WTF-420
     * @traces 654987 - bthis is a fourth unit test
     * @traces 654987 - ethis is a fifth unit test
     * @traces 654987 - athis is a sixth unit test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });
})