'use strict';

const _ = require('underscore');
const compare = require('json-structure-diff').compareJSONObjects;

const structureJsonRaw = require('./keyfiles-structure.json');
const structureJson = toLower(structureJsonRaw);

/**
 * Deep copies JSON object with keys.toLowerCase()
 * @param  {Object} obj input
 * @return {Object}     output
 */
function toLower(obj) {
    var newObj = {};
    _.keys(obj).forEach((key) => {
        if (typeof(newObj[key.toLowerCase()] = obj[key]) === 'object')
            newObj[key] = toLower(newObj[key])
    });
    return newObj
}

/**
 * Matches the input object's structure against valid keyfile structures
 * (respects key and value-type)
 * @param  {Object} obj input keyfile object
 * @return {[String, Number]} array of type (web3|ethersale) and version
 */
module.exports = function(obj) {
    var result = null;
    try {
        _.keys(structureJson).forEach((structureType) => {
            var structure = {
                parent: structureType,
                content: structureJson[structureType]['json']
            }
            var instance = {
                parent: 'obj',
                content: toLower(obj)
            }
            var error = compare([structure, instance]);
            if (!error) {
                var match = structureJson[structure.parent];
                result = [ match.type, match.json.version ];
                throw BreakException;
            }
        });
    } catch (e) {
        // break out of loop; keyfile already validated
    }
    return (result) ? result : null
}
