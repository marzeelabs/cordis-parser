var Converter = require('csvtojson').Converter;
var fs = require('fs');
var request = require('request');

// Remote Cordis projects URL
var CORDIS_HORIZON2020_PROJECTS_URL = 'http://cordis.europa.eu/data/cordis-h2020projects.csv'


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

}
