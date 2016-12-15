var express = require('express');
var router = express.Router();

var Podcast = require('../models/Podcast.js');

router.get('/', function(req, res) {
	Podcast.find({}, function(err, docs){
		// Returns error from db to be handled by error handling middleware
		if (err) {
			console.log(err);
			return next(err);
		}
		else {
			res.json({ "data" : docs});
		}
	});
});

router.get('/:podcast_title', function(req, res, next) {
	Podcast.findOne({'url_title' : req.params.podcast_title}, function(err, podcast) {
		// Returns error from db to be handled by error handling middleware
		if (err) {
			console.log(err);
			return next(err);
		}
		// If no podcast document was found matching the url parameter,
		// throws new 404 error to be handled by error handling middleware
		else if (podcast === null) {
			var err = new Error();
			err.status = 404;
			return next(err);
		}
		else {
			res.json(podcast);
		}
	});
});

router.get('/:podcast_title/p/:page_number', function(req, res, next) {
	//Throws 404 error if page_number is NaN
	if(isNaN(req.params.page_number)) {
		var err = new Error();
		err.status = 404;
		return next(err);
	}
	else{
		res.send({ "page" : parseInt(req.params.page_number)});
	}
});

module.exports = router;