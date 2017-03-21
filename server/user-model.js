var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  trips: []
});

var User = mongoose.model('User', UserSchema);
console.log('User: ', User);

module.exports = User;
