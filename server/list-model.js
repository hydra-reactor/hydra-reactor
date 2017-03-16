var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var List = new Schema({
  description: String,
  category: String
});

module.exports = List;

// Image URLs associated with categories will be handled on the frontend
// for ease of changing the images.
