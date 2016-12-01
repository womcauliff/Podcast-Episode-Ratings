//Seeds mongodb with example podcast and episode.

var mongoose = require('mongoose');

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


var newImage = new Image({
	title: "CodeNewbie",
	url: "https://assets.blubrry.com/coverart/orig/220808.jpg",
	link: "http://www.codenewbie.org/podcast"
});

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
			return podcastDocs.map(doc => doc.remove());
			// return podcastDocs.map(doc => (
			// 	Podcast.remove({_id: doc._id}).exec()
			// 	) );
		}

		
}).then(function(deferreds) {
	Promise.all(deferreds)
		.then(function() {
			var newPodcast = new Podcast({
				title: "CodeNewbie",
				link: "http://www.codenewbie.org/podcast",
				description: "Stories and interviews from people on their coding journey.",
				language: "en-US",
				image: newImage
			});

			newPodcast.save(function(err, podcastDoc){
				// log any errors
				if(err){
					console.log(err);
				}
				// otherwise
				else {
					console.log("Podcast loaded successfully");
					var Episode114 = new Episode({
						title: "Ep. 114 – What's an Innovation Accountant? (Nick DePrey)",
						podcast_id : podcastDoc._id
					});
					Episode114.save(function(err, doc){
						// log any errors
						if(err){
							console.log(err);
						} 
						// otherwise
						else {
							// using the Article id passed in the id parameter of our url, 
							// prepare a query that finds the matching Article in our db
							// and update it to make it's lone note the one we just saved
							Podcast.findOneAndUpdate({'_id': podcastDoc._id}, {$push: {'episodes': doc._id}}, {new: true})
							// execute the above query
							.exec(function(err, doc){
								// log any errors
								if (err){
									console.log(err);
								} else {
									// or send the document to the browser
									console.log('successfully saved Episode to Podcast');
								}
								mongoose.disconnect();
								console.log('disconnected');
							});
						}
					});	
				}
			});
			// mongoose.disconnect();		
	});
	
	// console.log('disconnected');
});



