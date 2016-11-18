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
  

  it('parses Horizon2020 projects and verifies headers are set correctly', function(done) {

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
        'subjects',
        'organizations'
      ];

      for (var i=0; i < result.length; i++) {
        for (var j=0; j < headers.length; j++) {
          assert(result[i].hasOwnProperty([headers[j]]), 'The value ' + headers[j] + ' is missing from the record ' + JSON.stringify(result[i]));
        }
      }

      done();
    });

  });

  it('parses Horizon2020 organizations and verifies headers are set correctly', function(done) {
    // Use a higher timeout to fetch the remote file
    this.timeout(15000);

    cp.parseHorizon2020Organizations(function(result) {
      headers = [
        'projectRcn',
        'projectReference',
        'projectAcronym',
        'role',
        'id',
        'name',
        'shortName',
        'activityType',
        'endOfParticipation',
        'ecContribution',
        'country',
        'street',
        'city',
        'postCode',
        'organizationUrl',
        'contactType',
        'contactTitle',
        'contactFirstNames',
        'contactLastNames',
        'contactFunction',
        'contactTelephoneNumber',
        'contactFaxNumber',
        'contactEmail'
      ];

      for (var i in result) {
        if (result.hasOwnProperty(i)) {
          for (var j=0; j < result[i].length; j++) {
            for (var k=0; k < headers.length; k++) {
              assert(result[i][j].hasOwnProperty([headers[k]]), 'The value ' + headers[k] + ' is missing from the record ' + JSON.stringify(result[i][j]));
            }
          }
        }
      }

      done();
    });

  });
});
