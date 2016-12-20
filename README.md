# cordis-parser [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Parses [EU Cordis data](http://cordis.europa.eu/projects/home_en.html) from the [European Union Open Data Portal](http://data.europa.eu/euodp/en/data/dataset/cordisH2020projects) and produces JSON

## Installation

```bash
npm install cordis-parser --save
```

Use like

```javascript
var cp = require('cordis-parser');
cp.parseHorizon2020(function(result) {
  // 'result' is an array with all Horizon2020 projects. Each element in the array is a JSON object.
});
```

## CLI

Use the CLI interface to quickly explore Horizon 2020 data.

Use like

```bash
cordis-parser -s ActiveGrid
```

to print the details for the "ActiveGrid" project. 

See

```bash
cordis-parser -h
```

for all options.


## License

MIT © [Marzee Labs](http://marzeelabs.org)


[npm-image]: https://badge.fury.io/js/cordis-parser.svg
[npm-url]: https://npmjs.org/package/cordis-parser
[travis-image]: https://travis-ci.org/marzeelabs/cordis-parser.svg?branch=master
[travis-url]: https://travis-ci.org/marzeelabs/cordis-parser
