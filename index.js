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

  parseHorizon2020Projects: function(cb) {
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

    var result = {};

    converter.on('end_parsed', function (jsonArray) {
      cb(result);
    });

    //record_parsed will be emitted each time a row has been parsed.
    converter.on("record_parsed", function(resultRow, rawRow, rowIndex) {
      var key = resultRow['projectRcn'];
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(resultRow);
    });

    request.get(CORDIS_HORIZON2020_ORGANIZATIONS_URL).pipe(converter);

    return converter;
  },

  parseHorizon2020: function(cb) {
    this.parseHorizon2020Organizations(function (orgs) {

      var converter = new Converter({
        delimiter: ';',
        // constructResult: false, // for big CSV data
        flatKeys: true,
      });

      converter.transform = function(json, row, index) {
        var rcn = json["rcn"];
        if (orgs[rcn]) {
          json["organizations"] = orgs[rcn];
        }
      };

      converter.on('end_parsed', function (jsonArray) {
        cb(jsonArray);
      });

      request.get(CORDIS_HORIZON2020_PROJECTS_URL).pipe(converter);

      return converter;

    });
  }

}
