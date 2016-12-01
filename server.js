// Declares dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
// var methodOverride = require('method-override');
var mongoose = require('mongoose');

// Configures Express server
var app = express();
app.set('port', (process.env.PORT || 5555));
app.use(bodyParser.urlencoded({
	extended: 5555
}));// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(logger('dev'));
// app.use(methodOverride('_method'));// override with POST having ?_method=DELETE

// Configures database with mongoose
mongoose.connect((process.env.MONGODB_URI ||'mongodb://localhost/podrater'));
var db = mongoose.connection;

// Displays mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Logs successful mongoose db login
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Makes public a static directory
app.use(express.static(process.cwd() + '/public'));

// Listening
app.listen(app.get('port'), function() {
  console.log("Express server listening on port %d in %s mode", 
  this.address().port, app.settings.env);
});