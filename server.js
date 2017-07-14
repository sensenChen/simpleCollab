/* server.js */

var express = require('express');
var app = express();
const path = require('path');



// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'/public/index.html'));
});

// get sharejs dependencies
var sharejs = require('share');

// set up redis server
var redisClient;
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redisClient = require("redis").createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = require("redis").createClient();
}

// options for sharejs 
var options = {
  db: {type: 'redis', client: redisClient}
};

// attach the express server to sharejs
sharejs.server.attach(app, options);

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);