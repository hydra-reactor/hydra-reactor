var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var User = require('./models/userModel.js');
var {authenticate} = require('./middleware/authenticate');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
mongoose.connect('mongodb://localhost/hydra');
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, '../client/')));
// Set up POST request listener for creating a new user
// Expects to receive email and password in req.body
app.post('/api/signup', function(req, res) {
  console.log('Received the following POST request to create a user: ', req.body);
  // Mongoose method to create a user
  var user = new User(req.body);
  user.save().then(() => {
    return user.generateToken();
  }).then(token => {
    res.header('x-auth', token).send(user);
  }).catch(err => {
    res.status(400).send(err);
  });
    // User.create(req.body, function(err, user) {
  //   if(err) {
  //     console.log('Error: ', err);
  //   } else {
  //     res.json(user);
  //   }
  // });
});
// Set up POST request listener for signing in a user
// Expects to receive a user_id in req.body
app.post('/api/signin', function(req, res) {
  var {email, password} = req.body;
  console.log('Received the following GET request for a user: ', req.body);
  User.findByCredentials(email, password).then(user => {
    return user.generateToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(err => {
    res.status(400).send(err);
  });
  // Mongoose method to retrieve a user
  // User.findOne({
  //   'email': req.body.email
  // }, function(err, user) {
  //   if(err) {
  //     console.log('Error: ', err)
  //   } else {
  //     res.json(user);
  //   }
  // });
});
app.delete('/api/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});
// Set up POST request listener for creating a new trip
// Expects to receive user_id and trip in req.body, where trip is an object with a tripName property
app.post('/api/trips', authenticate, function(req, res) {
  console.log('Received the following POST request to create a trip: ', req.body);
  // Mongoose method to retrieve and update a user
  User.findOneAndUpdate({'_id': req.body.user_id}, {$push: { trips: { tripName: req.body.trip.tripName } } }, {new: true}, function(err, user) {
    if(err) {
      console.log('Error: ', err);
    } else {
      res.json(user);
      // Commented out code that incorporated day schema
      // Create a new day object in the days array for each day in numDays
      // var trip_id = user.trips[user.trips.length - 1]['_id'];
      // for(var i = 1; i <= req.body.trip.numDays; i++) {
      //   var dayObject = { day: i };
      //   User.findOneAndUpdate({'_id': req.body.user_id, 'trips._id': trip_id}, {$push: { 'trips.$.days': dayObject } }, {new: true}, function(err, user) {
      //     if(err) {
      //       console.log('Error: ', err);
      //     } else {
      //       // if all iterations are complete, respond with the updated user data
      //       if(user.trips.id(trip_id).days.length === req.body.trip.numDays) {
      //         res.json(user);
      //       }
      //     }
      //   });
      // }
    }
  });
});
// Set up POST request listener for creating a new activity
// Expects to receive user_id, trip_id, and activity in req.body,
// where activity is an object with description and category properties
app.post('/api/activities', authenticate, function(req, res) {
  // Pass in request object that includes user id, trip object id, activity object
  console.log('Received the following POST request to create an activity: ', req.body);
  User.findById(req.body.user_id, function(err, user) {
    if(err) {
      console.log('Error: ', error);
    } else {
      // Commented out version with day schema
      // user.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.push(req.body.activity);
      user.trips.id(req.body.trip_id).activities.push(req.body.activity);
      user.save();
      res.json(user);
    }
  });
});
// Set up DELETE request listener for deleting an activity
// Expects to receive user_id, trip_id, and activity_id in req.body
app.delete('/api/activities', authenticate, function(req, res) {
  console.log('Received the following DELETE request to delete an activity', req.body);
  // Call Mongoose remove method on id matching the request
  User.findById(req.body.user_id, function(err, user) {
    if(err) {
      console.log('Error: ', error);
    } else {
      // The following code splices an individual activity out of the activities array
      // Commented out version with day schema
      // var activities = user.trips.id(req.body.trip_id).days.id(req.body.day_id).activities;
      var activities = user.trips.id(req.body.trip_id).activities;
      activities.splice(activities.indexOf(activities.id(req.body.activity_id)), 1);
      user.save();
      res.json(user);
    }
  });
});
var port = process.env.PORT || 3000;
// var ip = process.env.IP || 'localhost';
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
