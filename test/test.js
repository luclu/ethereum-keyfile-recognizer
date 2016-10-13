const fs = require('fs');
const recognizer = require('../src');
const assert = require('chai').assert;

describe('recognize valid keyfiles', () => {
    var json = JSON.parse(fs.readFileSync('test/keyfiles-valid-instances.json'));

    it('type: ethersale', () => {
        assert.deepEqual(['ethersale', undefined], recognizer(json['ethersale']))
    });
    it('type: web3 v3 geth', () => {
        assert.deepEqual(['web3', 3], recognizer(json['web3-v3-geth']))
    });
    it('type: web3 v3 eth', () => {
        assert.deepEqual(['web3', 3], recognizer(json['web3-v3-eth']))
    });
    it('type: web3 v3 parity', () => {
        assert.deepEqual(['web3', 3], recognizer(json['web3-v3-parity']))
    });
    it('type: web3 v3 myethereumwallet', () => {
        assert.deepEqual(['web3', 3], recognizer(json['web3-v3-myethereumwallet']))
    });
});

describe('recognize invalid keyfiles', () => {
    var json = JSON.parse(fs.readFileSync('test/keyfiles-invalid-instances.json'));

    it('missing key-value pair', () => {
        assert.notDeepEqual(['web3', 3], recognizer(json['missing-key']))
    });
    it('invalid key', () => {
        assert.notDeepEqual(['web3', 3], recognizer(json['invalid-key']))
    });
    it('invalid value-type', () => {
        assert.notDeepEqual(['web3', 3], recognizer(json['invalid-value-type']))
    });
});
