var Converter = require('csvtojson').Converter;
var fs = require('fs');
var request = require('request');

// Remote Cordis projects URL.
// These are all linked from https://data.europa.eu/euodp/en/data/dataset?q=cordis&ext_boolean=all&sort=views_total+desc
var CORDIS_HORIZON2020_PROJECTS_URL = 'http://cordis.europa.eu/data/cordis-h2020projects.csv'
var CORDIS_HORIZON2020_ORGANIZATIONS_URL = 'http://cordis.europa.eu/data/cordis-h2020organizations.csv'

module.exports = {

  parseFile: function(file, cb) {
    var converter = new Converter({
      delimiter: ';',
      flatKeys: true,
    });

    converter.on('end_parsed', function (jsonArray) {
      cb(jsonArray);
    });

    fs.createReadStream(file).pipe(converter);

    return converter;
  },

  parseHorizon2020: function(cb) {
    var converter = new Converter({
      delimiter: ';',
      // constructResult: false, // for big CSV data
      flatKeys: true,
    });

    converter.on('end_parsed', function (jsonArray) {
      cb(jsonArray);
    });

    request.get(CORDIS_HORIZON2020_PROJECTS_URL).pipe(converter);

    return converter;
  },

  parseHorizon2020Organizations: function(cb) {
    var converter = new Converter({
      delimiter: ';',
      // constructResult: false, // for big CSV data
      flatKeys: true,
    });

    converter.on('end_parsed', function (jsonArray) {
      cb(jsonArray);
    });

    request.get(CORDIS_HORIZON2020_ORGANIZATIONS_URL).pipe(converter);

    return converter;
  },

}
