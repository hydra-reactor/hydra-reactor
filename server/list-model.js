var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
  description: String,
  category: String
});

var List = mongoose.model('List', ListSchema);

module.exports = List;

// Image URLs associated with categories will be handled on the frontend
// for ease of changing the images.
