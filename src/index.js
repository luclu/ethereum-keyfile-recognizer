'strict mode';

const _ = require('underscore');
const compare = require('json-structure-diff').compareJSONObjects;

const structureJsonRaw = require('./keyfiles-structure.json');

/**
 * Deep copies JSON object with keys.toLowerCase()
 * @param  {Object} obj input
 * @return {Object}     output
 */
function toLower(obj) {
    const newObj = {};
    _.keys(obj).forEach((key) => {
        const type = typeof (newObj[key.toLowerCase()] = obj[key]);
        if (type === 'object') {
            newObj[key] = toLower(newObj[key]);
        }
    });
    return newObj;
}

const structureJson = toLower(structureJsonRaw);

/**
 * Matches the input object's structure against valid keyfile structures
 * (respects key and value-type)
 * @param  {Object} obj input keyfile object
 * @return {[String, Number]} array of type (web3|ethersale) and version
 */
module.exports = (obj) => {
    let result = null;
    const BreakException = {};
    try {
        _.keys(structureJson).forEach((structureType) => {
            const structure = {
                parent: structureType,
                content: structureJson[structureType].json,
            };
            const instance = {
                parent: 'obj',
                content: toLower(obj),
            };
            const error = compare([structure, instance]);
            if (!error) {
                const match = structureJson[structure.parent];
                result = [match.type, match.json.version];
                throw BreakException;
            }
        });
    } catch (err) {
        // break out of loop; keyfile already validated
    }
    return result;
};
