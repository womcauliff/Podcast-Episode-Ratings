var express = require('express');
var router = express.Router();

var Episode = require ('../models/Episode');

//episode
router.get('/:episode_id', function(req, res) {
	//sends episode name, rating, episode notes
	console.log(req.params.episode_id);
	Episode.findOne({'_id' : req.params.episode_id}, function(err, episode) {
		console.log('result');
		console.log(episode);
		// Returns error from db to be handled by error handling middleware
		if (err) {
			console.log(err);
			return next(err);
		}
		// If no episode document was found matching the url parameter,
		// throws new 404 error to be handled by error handling middleware
		else if (episode === null) {
			var err = new Error();
			err.status = 404;
			return next(err);
		}
		else {
			res.json({"data" : episode});
		}
	});
});

module.exports = router;