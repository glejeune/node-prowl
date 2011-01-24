/**
 * Module dependencies.
 */
var https = require('https');
var querystring = require("querystring");

/**
 * Create a new Prowl object
 * @constructor
 * @param {String} apikey Your prowl API Key
 * @param {String} providerkey Your prowl Provider Key
 * @return {Prowl}
 * @api public
 */
function Prowl(apikey, providerkey) {
  if(apikey === undefined) {
    throw "You must pass your apikey!"
  }
  this.apikey = apikey;
  this.providerkey = providerkey;
}

/**
 * Verify an API key is valid.
 * @constructor
 * @param {Function} endFunction Callback. This function receive the status of the request.
 * @api public
 */
Prowl.prototype.verify = function(endFunction) {
  var options = {
    host: 'prowl.weks.net',
    port: 443,
    path: '/publicapi/verify?apikey='+this.apikey,
    method: 'GET'
  };
  
  if(this.providerkey !== undefined) {
    options.path += "&providerkey="+this.providerkey
  }
  
  var req = https.request(options, function(res) {
    if(endFunction !== undefined) {
      endFunction(res.statusCode)
    }
  });
  req.end();
  
  req.on('error', function(e) {
    throw e;
  });
}

/**
 * Add a notification for a particular user.
 * @constructor
 * @param {Object} params Notification parameters : priority, application, event and description
 * @param {Function} endFunction Callback. This function receive the status of the request.
 * @api public
 */
Prowl.prototype.add = function(params, endFunction) {
  params.apikey = this.apikey;
  if(this.providerkey !== undefined) {
    params.providerkey = this.providerkey;
  }
  
  var body = querystring.stringify(params);
  
  var options = {
    host: 'prowl.weks.net',
    port: 443,
    path: '/publicapi/add',
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Content-Length': body.length,
      'Transfer-Encoding': 'chunked'
    }
  };
  
  var req = https.request(options, function(res) {
    if(endFunction !== undefined) {
      endFunction(res.statusCode)
    }
  });
  req.write(body, 'utf8');
  req.end();
  
  req.on('error', function(e) {
    throw e;
  });
}

/**
 * Prowl priorities
 * @api public
 */
Prowl.VERY_LOW  = -2;
Prowl.MODERATE  = -1;
Prowl.NORMAL    =  0;
Prowl.HIGH      =  1;
Prowl.EMERGENCY =  2;

/**
 * Usage :
 *     var Prowl = require('../lib/prowl').Prowl;
 *     var p = new Prowl('123456789012345678901234567890');
 *     ...
 */
exports.Prowl = Prowl;
