// var should = require('chai').should(),
var cp = require('../index');
var Converter = require('csvtojson').Converter;
var assert = require('assert');

describe('#cordis_parser', function() {
  it('parses sample.csv and reads a number of items', function(done) {
    cp.parseFile(__dirname + '/sample.csv', function(result) {
      assert.equal(result.length, 4);
      done();
    });
  });

  it('parses Horizon2020 data and verifies headers are set correctly', function(done) {

    // Use a higher timeout to fetch the remote file
    this.timeout(15000);

    cp.parseHorizon2020(function(result) {
      headers = [
        'rcn',
        'reference',
        'acronym',
        'status',
        'programme',
        'topics',
        'frameworkProgramme',
        'title',
        'startDate',
        'endDate',
        'projectUrl',
        'objective',
        'totalCost',
        'ecMaxContribution',
        'call',
        'fundingScheme',
        'coordinator',
        'coordinatorCountry',
        'participants',
        'participantCountries',
        'subjects'
      ];

      for (var i=0; i < result.length; i++) {
        for (var j=0; j < headers.length; j++) {
          assert(result[i].hasOwnProperty([headers[j]]), 'The value ' + headers[j] + ' is missing from the record ' + JSON.stringify(result[i]));
        }
      }

      done();
    });

  });
});
