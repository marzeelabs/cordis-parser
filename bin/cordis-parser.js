#! /usr/bin/env node

var cli = require('cli');
var cp = require('../index');
var Fuse = require('fuse.js');
var prettyjson = require('prettyjson');

cli.parse({
	type: [ 't', 'Type of CSV to fetch. Can be "projects" or "organizations", or "combined". Defaults to "combined".', 'string', 'combined'],
	search: [ 's', 'A word to search for in the result set. Only matches will be returned. Useful for taking quick peeks', 'string', ''],
	noPrettyPrint: [ 'p', 'Do not pretty print JSON. Useful for chaining.'],
});

cli.main(function(args, options) {

	var printOutput = function(result) {
		var output = '';
		if (options.search) {
			var searchOptions = {
				threshold: 0,
				keys: ['acronym', 'title', 'participants']
			};
			var f = new Fuse(result, searchOptions);
			var search = f.search(options.search);
			output = search;
		} 
		else {
			output = result;
		}

		if (options.noPrettyPrint) {
			process.stdout.write(JSON.stringify(output));
		}
		else {
			console.log(prettyjson.render(output));
		}
	}

	switch(options.type) {
		case 'projects':
			cp.parseHorizon2020Projects(printOutput);
			break;
		case 'organizations':
			cp.parseHorizon2020Organizations(printOutput);
			break;
		case 'combined':
		default:
			cp.parseHorizon2020(printOutput);
			break;
	}
});
