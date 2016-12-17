//Seeds mongodb with example podcast and episode.

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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

//TESTING
var Image = require('./models/Image.js');
var Episode = require('./models/Episode.js');
var Podcast = require('./models/Podcast.js');

Podcast
	.find({})
	.exec(function(err, podcastDocs) {

		if(err){
			console.log(err);
		}
		else{
			console.log('deleted');

			//v1 - foreach
			// var deferreds = [];
			// podcastDocs.forEach(function(podcastDoc) {
			// 	//Uses Mongoose 'remove' middleware for cascading delete
			// 	//of all Episode documents associated with this Podcast
			// 	var deferred = Podcast.remove({_id: podcastDoc._id}).exec();
			// 	deferreds.push(deferred);
			// });
			// return deferreds;

			//v2 - map
			// return podcastDocs.map(function(podcastDoc) {
			// 	return Podcast.remove({_id: podcastDoc._id}).exec();
			// });

			//v3 - ES6 map
			// Changed from Podcast.remove(...) because otherwise 'remove' middleware
			// for Podcast will not be invoked.
			return podcastDocs.map(doc => doc.remove());
		}
}).then(function(deferreds) {
	/*
	 * The following Promise resolves after all of the promises within `deferreds`
	 * have been resolved (this occurs after all podcasts, episodes, and images
	 * have been deleted). */
	 Promise.all(deferreds)
	.then(function() {

		var newPodcast = new Podcast({
			title: "CodeNewbie",
			link: "http://www.codenewbie.org/podcast",
			description: "Stories and interviews from people on their coding" +
			" journey.",
			language: "en-US" }
		);

		//Save podcast to db
		newPodcast.save()
		//Save episode to db
		.then(function(podcastDoc){
			console.log("Podcast loaded successfully.");

			var Episode114 = new Episode({
				title: "Ep. 114 – What's an Innovation Accountant? (Nick DePrey)",
				podcast_id : podcastDoc._id
			});
			return Episode114.save();//returns promise
		})
		//Add the episode to the podcast
		.then(function(episode) {
			console.log("Episode loaded successfully.");

			return Podcast.findOneAndUpdate(
				{'_id': episode.podcast_id},
				{$push: {'episodes': episode._id}},
				{new: true}
			)
			.exec();// execute the above query, returns promise
		})
		.then(function(podcastDoc){
			console.log("Podcast loaded successfully.");

			var Episode115 = new Episode({
				title: "Ep. 115 –  Getting a Computer Science Degree (Terri Burns)",
				podcast_id : podcastDoc._id
			});
			return Episode115.save();//returns promise
		})
		//Add the episode to the podcast
		.then(function(episode) {
			console.log("Episode loaded successfully.");

			return Podcast.findOneAndUpdate(
				{'_id': episode.podcast_id},
				{$push: {'episodes': episode._id}},
				{new: true}
			)
			.exec();// execute the above query, returns promise
		})
		//Save Image to db
		.then(function(podcastDoc){
			console.log('successfully saved Episode to Podcast');

			var newImage = new Image({
				title: "CodeNewbie",
				url: "https://assets.blubrry.com/coverart/orig/220808.jpg",
				link: "http://www.codenewbie.org/podcast",
				podcast_id : podcastDoc._id
			});
			return newImage.save();//returns promise
		})
		//Add the Image to Podcast
		.then(function(imageDoc) {
			console.log("Image loaded successfully.");

			return Podcast.findOneAndUpdate(
				{'_id': imageDoc.podcast_id},
				{$set: {'image': imageDoc._id}},
				{new: true}
			)
			.exec();// execute the above query, returns promise
		})
		.then(function() {
			console.log('successfully saved Image to Podcast');

			var newPodcast = new Podcast({
				title: "This American Life",
				link: "https://www.thisamericanlife.org",
				description: "This American Life is a weekly public radio show, " +
				"heard by 2.2 million people on more than 500 stations. Another 1.5 " +
				"million people download the weekly podcast. It is hosted by Ira " +
				"Glass, produced in collaboration with Chicago Public Media, " +
				"delivered to stations by PRX The Public Radio Exchange, and has won" +
				" all of the major broadcasting awards.",
				language: "en-US" }
			);
			//Save podcast to db
			return newPodcast.save();
		})
		.then(function(podcastDoc){
			console.log("Podcast loaded successfully.");

			var Episode604 = new Episode({
				title: "#604: 20 Years Later",
				podcast_id : podcastDoc._id
			});
			return Episode604.save();//returns promise
		})
		//Add the episode to the podcast
		.then(function(episode) {
			console.log("Episode loaded successfully.");

			return Podcast.findOneAndUpdate(
				{'_id': episode.podcast_id},
				{$push: {'episodes': episode._id}},
				{new: true}
			)
			.exec();// execute the above query, returns promise
		})
		//Close db connection
		.then(function(podcastDoc) {
			console.log('successfully saved Episode to Podcast');

			mongoose.disconnect();
			console.log('disconnected');
		})
		.catch(function(err) {
			console.log(err);
		});
	});
});



