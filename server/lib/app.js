var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var os = require('os');
var routes = require('./../routes/index');
var users = require('./../routes/users');
var config = require('./../config.json');

var app = express();

// view engine setup
console.log("!!!!!!!!!!!!" + path.join('./../', 'views'));
app.use(express.static(__dirname + './../public'));
app.set('views', __dirname + './../public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

require('http').createServer(app).listen(config.port);
console.log('Http server is listening on ' + os.hostname() + ':' + config.port);

app.get('/', function(req, res) {
  res.sendFile(express.static(path.join('./../../client' + '/index.html')));
});


app.get('/user', function(req, res, next){

  console.log('trilili tralala');


  var err = new Error('Not Found trilili');
  err.status = 404;

  next(null);
});

module.exports = app;
