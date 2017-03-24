const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  description: String,
  category: String
});

// Commented versions that include Day schema
// var DaySchema = new Schema({
//   day: Number,
//   activities: [ActivitySchema]
// });
//
// var TripSchema = new Schema({
//   tripName: String,
//   days: [DaySchema]
// });

var TripSchema = new Schema({
  tripName: String,
  activities: [ActivitySchema]
});

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    // unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true
    // minlength: 6
  },
  tokens: [{
    access: {
      type: String
      // required: true
    },
    token: {
      type: String
      // required: true
    }
  }],
  trips: [TripSchema]
});


// methods - instance methods
UserSchema.methods.generateToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toString(), access}, 'somesecret');

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};


UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};


// statics - Model methods
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'somesecret');
  } catch (err) {
    return Promise.reject(err);
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  // console.log('----- findByCredentials -----');
  // console.log('User', User);

  return User.findOne({email}).then((user) => {
    if (!user) {
      console.log('Promise.reject');
      return Promise.reject();
    }
    // because bcrypt didn't support Promises, use generic Promise
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          console.log('Resolve bcrypt');
          resolve(user);
        } else {
          console.log('Reject bcrypt');
          reject();
        }
      });
    });
  });
};

// Mongoose middleware, runs before each 'save'
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
