// require mongoose
var mongoose = require('mongoose');
// creates Schema class
var Schema = mongoose.Schema;

var Episode = require('./Episode.js');
var Image = require('./Image.js');

// Creates Podcast schema
var PodcastSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    trim: true
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  episodes: [{
    type: Schema.Types.ObjectId,
    ref: 'Episode'
  }]
}
,
{
  timestamps: true
});

//Removes query string from source URL
PodcastSchema.pre('save', function(next){
  this.link = this.link.split(/[?#]/)[0];
  next();
});

PodcastSchema.pre('remove', function(next){
  Episode.remove({podcast_id : this._id }).exec();
  Image.remove({podcast_id : this._id }).exec();
  next();
})

// Creates the Podcast model with the PodcastSchema
var Podcast = mongoose.model('Podcast', PodcastSchema);

// Exports the Podcast model
module.exports = Podcast;