var sys = require('sys'),
	Prowl = require('../lib/prowl').Prowl;

var p = new Prowl('123456789012345678901234567890');

p.verify(function(status) {
  console.log("-- verify status = "+status)
});

var data = {
  priority: Prowl.NORMAL,
  application: "node-prowl",
  event: "Test",
  description: "A message from node-prowl"
};

p.add(data, function(status) {
  console.log("-- add status = "+status)
});