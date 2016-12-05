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

// Imports and mounts express Router objects
var podcast_routes = require('./controllers/podcast_routes.js');
var error_handling = require('./controllers/error_handling.js');

app.use('/api/podcast', podcast_routes);

// Assumes 404, as no routes above responded
app.get('*', function(req, res, next){
	console.log("no pages found");
	var err = new Error();
	err.status = 404;
	next(err);
});

// Adds Error middleware
app.use(error_handling['404']);
app.use(error_handling['500']);

// Listening
app.listen(app.get('port'), function() {
  console.log("Express server listening on port %d in %s mode", 
  this.address().port, app.settings.env);
});