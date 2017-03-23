var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ActivitySchema = new Schema({
  description: String,
  category: String
});
var DaySchema = new Schema({
  day: Number,
  activities: [ActivitySchema]
});
var TripSchema = new Schema({
  tripName: String,
  days: [DaySchema]
});
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
  trips: [TripSchema]
});
var User = mongoose.model('User', UserSchema);
console.log('User: ', User);
module.exports = User;

