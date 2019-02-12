
describe('suite', () => {
    /**
     * @name test
     * @jira ABC-123
     * @traces 1317429 - This is a unit test
     * @jira GHI-789
     * @traces 67890 - this is another unit test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @traces cthis is a third unit test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @jira ADHDEV-1234
     * @traces 1355898 - this is a fourth unit test
     * @traces 1258529 - this is a fifth unit test
     * @traces 654987 - this is a sixth unit test
     */
    it('test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @jira ADHDEV-1234
     * @traces 18346578 - Verify that this list gets included in the report
     *   1. Order Ingredients
     *   2. Clinical Display Line (CDL)
     *   3. Order Status
     *   4. Order Indicators with associated label
     *   5. Order Comments
     *   6. Product Notes
     *   7. Special Instructions
     *   8. Administration Notes
     */
    it('has a multi-line test', () => {
        expect(true).toEqual(true);
    });

    /**
     * @name test
     * @traces 1305930 -  Verify the system provides the order status for the Order Status attribute.
     * @traces 1355898 - repeat
     * @traces 1355898 - repeat
     * @traces 1355898 - repeat
     */
    it('', () => {

    });
})