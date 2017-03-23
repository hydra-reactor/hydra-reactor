var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  description: String,
  category: String
});

var Activity = mongoose.model('Activity', ActivitySchema);
console.log('Activity: ', Activity);

module.exports = Activity;

// Image URLs associated with categories will be handled on the frontend
// for ease of changing the images.
