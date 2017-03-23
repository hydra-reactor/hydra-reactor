const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
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
    // require: true
    // minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      // required: true
    },
    dima: String,
    token: {
      type: String,
      // required: true
    }
  }],
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

// methods - instance methods
UserSchema.methods.generateToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toString(), access}, 'somesecret');

console.log('TOKEN', token);
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
    decoded = jwt.verify(token, 'abc123');
    console.log(decoded);
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// Mongoose middleware, runs before each 'save'
UserSchema.pre('save', function (next) {
  var user = this;

  // if password changed - create new hash
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      next();
    });

    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(user.password, salt, (err, hash) => {
    //     user.password = hash;
    //     next();
    //   });
    // });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', UserSchema);
