// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Episode schema
var EpisodeSchema = new Schema({
  title: {
    type:String,
    required: true
  },
  podcast_id: {
  	type: Schema.Types.ObjectId,
  	ref: 'Podcast'
  }
},
{
  timestamps: true
});

// create the Episode model with the Episode schema
var Episode = mongoose.model('Episode', EpisodeSchema);

// export the Episode model
module.exports = Episode;