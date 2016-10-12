'use strict';

const _ = require('underscore');
const compare = require('json-structure-diff').compareJSONObjects;

const structureJsonRaw = require('../test/keyfiles-structure.json');
const structureJson = toLower(structureJsonRaw);

/**
 * As 'json-structure-diff' uses the case-sensitive
 * JSON.hasOwnProperty() the JSON objects must be
 * parsed to lower case.
 */
function toLower(obj) {
    var newObj = {};
    _.keys(obj).forEach((key) => {
        if (typeof(newObj[key.toLowerCase()] = obj[key]) === 'object') newObj[key] = toLower(newObj[key])
    });
    return newObj
}

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
                result = [match.type, match.json.version];
                throw BreakException;
            }
        });
    } catch (e) {}
    return (result) ? result : null
}
