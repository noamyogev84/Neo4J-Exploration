'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // formerly express.logger
var errorhandler = require('errorhandler');
var dbAdapter = require('./neo4J/neo4JAdapter');
var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// express/connect middleware

app.use(morgan('dev'));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });


// serve up static assets
app.use(express.static('client'));

//routes
app.get('/commands',function(res,req){
  //TODO: implement if needed
});

// POST /api/users gets JSON bodies
app.post('/commands', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  var command = req.body.command;
  console.log("server ack : " + command);

  //call db with command
  console.log(dbAdapter.getAllPlayers());

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
})

// development only
if ('development' === app.get('env')) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), function () {
  console.log('noam the kings server listening on port ' + app.get('port'));
});
