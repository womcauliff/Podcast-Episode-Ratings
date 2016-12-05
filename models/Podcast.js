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
  url_title: {
    type: String,
    unique: true,
    required: true
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
},
{
  timestamps: true
});

/*
 * Document Middleware (hooks)
 */

/* Before validating new Podcast document:
 * - generates `url_title` from podcast title, replacing whitespace with `-`,
 * and setting all characters to lowercase.
 */
PodcastSchema.pre('validate', function(next){
  this.url_title = this.title.replace(/\W+/g, "-").toLowerCase();
  next();
});

/* Before removing Podcast document from db:
 * - removes episode subdocuments
 * - removes image subdocument
 */
PodcastSchema.pre('remove', function(next){
  Episode.remove({podcast_id : this._id }).exec();
  Image.remove({podcast_id : this._id }).exec();
  next();
})

// Creates the Podcast model with the PodcastSchema
var Podcast = mongoose.model('Podcast', PodcastSchema);

// Exports the Podcast model
module.exports = Podcast;