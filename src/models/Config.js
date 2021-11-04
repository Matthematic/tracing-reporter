import ow from 'ow';

export const CONSTANTS = Object.freeze({
    DESCENDING: -1,
    ASCENDING: 1,
});

class Config {
    constructor(options = { tags: { } }) {
        this.config = {
            reportPath: undefined,
            dataPath: undefined,
            types: undefined,
            matcher: (test) => {
                if (/^[0-9]+(,\s*[0-9]+)*\s*-\s*/.test(test)) { // matches the "1000[, 2000] - test name" format
                    const id = test.slice(0, test.indexOf('-')).trim().split(',').map(x => x.trim()); // return a list of id's
                    const name = test.slice(test.indexOf('-') + 1).trim();
                    return { id, name };
                }
                return false;
            },
            filter: () => true,
            issueHost: 'https://jira2.cerner.com/browse/',
            sortDirection: CONSTANTS.ASCENDING,
            tableSortKey: 'name',
            tableSortDirection: CONSTANTS.ASCENDING,
            verbose: false,
            silent: false,
            ...options,
            tags: {
                name: 'requirement',
                issue: 'issue',
                traces: 'traces',
                ...options.tags
            },
        }
    }

    get() {
        return this.config;
    }

    validate() {
        ow(this.config, ow.object.exactShape({
            reportPath: ow.optional.string.not.empty,
            dataPath: ow.optional.string.not.empty,
            types: ow.object.not.empty,
            matcher: ow.function,
            filter: ow.function,
            issueHost: ow.optional.string.not.empty,
            tableSortKey: ow.optional.any(
                ow.string.equals('id'),
                ow.string.equals('issues'),
                ow.string.equals('link'),
                ow.string.equals('name'),
                ow.string.equals('type'),
                ow.string.equals('shortLink')
            ),
            tableSortDirection: ow.optional.any(
                ow.number.is(x => x === CONSTANTS.ASCENDING),
                ow.number.is(x => x === CONSTANTS.DESCENDING),
            ),
            sortDirection: ow.optional.any(
                ow.number.is(x => x === CONSTANTS.ASCENDING),
                ow.number.is(x => x === CONSTANTS.DESCENDING),
            ),
            silent: ow.optional.boolean,
            tags: ow.object.exactShape({
                name: ow.optional.string.not.empty,
                issue: ow.optional.string.not.empty,
                traces: ow.optional.string.not.empty
            }),
            verbose: ow.optional.boolean,
        }));

        ow(this.config.reportPath || this.config.dataPath, 'reportPath OR dataPath', ow.string.not.empty);

        return this;
    }
}

export default Config;