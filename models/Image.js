// require mongoose
var mongoose = require('mongoose');
// create a schema class
var Schema = mongoose.Schema;

// create the Image schema
var ImageSchema = new Schema({
  title: {
    type: String
  },
  url: {
  	type: String,
  	required: true,
  	trim: true
  },
  link: {
  	type: String,
  	trim: true
  },
  podcast_id: {
		type: Schema.Types.ObjectId,
		ref: 'Podcast'
  }
},
{
  timestamps: true
});

// create the Image model with the Image schema
var Image = mongoose.model('Image', ImageSchema);

// export the Image model
module.exports = Image;