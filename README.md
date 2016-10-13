# ethereum-keyfile-recognizer

[![Build Status](https://travis-ci.org/luclu/ethereum-keyfile-recognizer.svg?branch=master)](https://travis-ci.org/luclu/ethereum-keyfile-recognizer) [![Coverage Status](https://coveralls.io/repos/github/luclu/ethereum-keyfile-recognizer/badge.svg?branch=master)](https://coveralls.io/github/luclu/ethereum-keyfile-recognizer?branch=master) [![Code Climate](https://codeclimate.com/github/luclu/ethereum-keyfile-recognizer/badges/gpa.svg)](https://codeclimate.com/github/luclu/ethereum-keyfile-recognizer) [![npm version](https://badge.fury.io/js/ethereum-keyfile-recognizer.svg)](https://badge.fury.io/js/ethereum-keyfile-recognizer)

Checks for structural sanity (key-names and value-types) of `json`-keyfiles.

Currently recognized keyfiles:
 - Ethersale
 - [web3-secret-storage](https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition) (v3)
  - scrypt
  - pbkdf2

## Installation

```shell
npm install --save ethereum-keyfile-recognizer
```

## Usage

```javascript
var fs = require('fs');
var recognizer = require('ethereum-keyfile-recognizer');

fs.readFile('keyfile.json', (err, data) => {
    var json = JSON.parse(data);
    var result = recognizer(json);
    /** result
     *               [ 'web3', 3 ]   web3 (v3) keyfile
     *  [ 'ethersale', undefined ]   Ethersale keyfile
     *                        null   no valid  keyfile
     */
}));
```

## Development

To build and run the tests:

```shell
$ npm install
$ npm test
```

## Contributions

Contributions welcome - see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT - see [LICENSE.md](LICENSE.md)
