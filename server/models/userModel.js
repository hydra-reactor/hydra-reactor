const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
    // unique: true
  },
  password: {
    type: String
  },
  trips: [{
    tripName: String,
    days: [{
      dayName: String,
      activities: [{
        activityName: String,
        category: String
      }]
    }]
  }]
});

module.exports = mongoose.model('User', UserSchema);
