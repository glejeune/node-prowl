// This file is a node-jake file -- http://github.com/mde/node-jake

var sys = require('sys'),
	exec  = require('child_process').exec,
	child;

var docTitle = 'node-prowl'
var docFiles = 'lib/prowl.js'
var outputDocFile = 'documentation.html'
var docRibbon = 'http://github.com/glejeune/node-prowl'
var docDesc = '[Node.js](http://nodejs.org) wrapper for [prowl](http://prowl.weks.net/)'

desc('Generate node-graphviz documentation.');
task('doc', [], function () {
  child = exec('dox -r ' + docRibbon + ' -d "' + docDesc + '" -t "' + docTitle + '" -J ' + docFiles + ' > ' + outputDocFile, 
    function (error, stdout, stderr) {
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
});