import _ from 'underscore';
import fs from 'fs';

class Printer {
    /**
     * When given a file path, this checks if it exists. 
     * If yes, it clears the file. If not, it creates the file and any nested folders required.
     * @param {String} path The path to be created. Must be an absolute path.
     * @returns {Boolean} Indicating if the file was prepared successfully
     */
    static checkDir(path) {
        if (typeof path !== 'string' || !path.length) {
            throw new Error('path must be a non-empty string');
        }
        // We need to trim off the file, or else mkdirSync will create it as a directory instead.
        let fileIdx = [...path].reverse().indexOf('/');
        if (fileIdx !== -1) {
            const dirPath = [...path].reverse().slice(fileIdx, path.length).reverse().join('');
            //const dirPath = path;
            try {
                if (!fs.existsSync(dirPath)){
                        fs.mkdirSync(dirPath, { recursive: true }); // create the nested directories
                        Printer.clearPath(path); // create the actual report file
                }
                else {
                    Printer.clearPath(path);
                }
                return true;
            }
            catch(e) {
                throw new Error(`Couldn't create file: ${e.message}`);
            }
        }
        else {
            throw new Error('Path does not contain a /. Double check that the path is absolute');
        }
    }

    /**
     * Clears the contents of a file
     * @param {String} path The path to be cleared. Must be an absolute path.
     * @returns {Boolean} If the file was cleared successfully
     */
    static clearPath(path) {
        if (typeof path !== 'string' || !path.length) {
            throw new Error('path must be a non-empty string');
        }
        try {
            fs.writeFileSync(path, '');
            return true;
        } catch (e) {
            throw new Error(`Could not clear the path: ${e.message}`)
        }
    }

    /**
     * Writes content to a file
     * @param {String} path The file path to write to
     * @param {String} payload The content to write to the file
     * @returns {Boolean} If the content was written successfully
     */
    static append(path, payload) {
        if (typeof path !== 'string' || !path.length) {
            throw new Error('path must be a non-empty string');
        }
        if (typeof payload !== 'string' || !payload.length) {
            throw new Error('payload must be a non-empty string');
        }
        try {
            fs.appendFileSync(
                path,
                payload,
            );
            return true;
        } catch (e) {
            throw new Error(`Could not append to file: ${e.message}`)
        }
    }

    /**
     * Prints the contents of the tableMap into a markdown report at the reportPath specified in the config
     * @param {Object} config 
     * @param {Object} tableMap 
     */
    static printMarkdown(config, tableMap) {
        const escapeChars = [
            [ /\*/g, '\\*' ],
            [ /#/g, '\\#' ],
            [ /\//g, '\\/' ],
            [ /\(/g, '\\(' ],
            [ /\)/g, '\\)' ],
            [ /\[/g, '\\[' ],
            [ /\]/g, '\\]' ],
            [ /</g, '&lt;' ],
            [ />/g, '&gt;' ],
            [ /_/g, '\\_' ],
            [/\n/g, '<br/>'] // MAKE SURE THIS IS LAST - THE < AND > HERE SHOULD NOT BE ESCAPED OR PRE TAG WILL FAIL
        ];

        const tests = tableMap.getTests()

        const stats = _.countBy(tests, 'type');
        const statString = Object.keys(stats).map((key) => `${key}: ${stats[key]}`).join(', ')

        if (config.reportPath) {
            const reportHeader = `# Tracing Report\n#### Total: ${tests.length} (${statString})\n`

            // print tableMap to report file
            let appendStr = reportHeader;
            tableMap.tables.forEach(table => { // for each table
                let testRows = table.tests.map(test => {
                    let { name, link, issues, shortLink, type } = test;

                    // escape characters for the name since it has to be proper markdown
                    escapeChars.forEach(char => {
                        name = name.replace(char[0], char[1]);
                    });

                    // Generate the display for the issue links
                    const issueLinks = issues.map(i => i.trim()).map(issue => issue !== 'N/A' ? `[${issue}](${config.issueHost}${issue})` : issue);

                    // Generate the display for the test name.
                    let formattedName = new String(name);
                    formattedName = formattedName.replace(/ {4}/g, '&nbsp;&nbsp;&nbsp;&nbsp;'); // At this point, only sequences of 4 spaces are considered as a supported indention
                    return `| <h6>${formattedName}</h6> | [${shortLink}](${link}) | ${issueLinks.join('<br/>')} | ${type} |`;
                });

                const tableHeader = `| Name (${testRows.length}) | Link | Issue | Type |\n` +
                                        '| :--- | :---: | :---: | :---: |\n';
                const rows = testRows.join('\n');
                appendStr += `\n\n### ${table.id}\n\n` + tableHeader + rows + '\n\n<hr/>';
            });
            return Printer.append(config.reportPath, appendStr)
            
        }
    }

    /**
     * Prints the stringified contents of the tableMap into the dataPath specified in the config
     * @param {Object} config 
     * @param {Object} tableMap 
     */
    static printData(config, tableMap) {
        if (config.dataPath) {
            return Printer.append(config.dataPath, JSON.stringify(tableMap, null, 2));
        }
    }
}

export default Printer;