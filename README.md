# ethereum-keyfile-recognizer

[![Build Status](https://travis-ci.org/luclu/ethereum-keyfile-recognizer.svg?branch=master)](https://travis-ci.org/luclu/ethereum-keyfile-recognizer)

Checks for structural sanity of Ethersale and [web3-secret-storage](https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition) `json`-keyfiles (validates key-names and value-types).

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
    /* returns:
     *   ['ethersale', undefined]   for Ethersale keyfile
     *                ['web3', 3]   for web3 (v3) keyfile
     *                       null   no valid keyfile
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
