var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var User = require('./user-model.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
mongoose.connect('mongodb://localhost/hydra');
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, '../client/')));

var testUser = {
  "email": "user@email.com",
  "password": "password123"
}

var testTrip = {
  "user_id": "58d2db385656590f7ef66d1f",  // Need to update with database data
  "trip": {
    "tripName": "Hawaii Vacation",
    "numDays": 3
  }
}

var testActivityAdd = {
	"user_id": "", // Need to update with database data
	"trip_id": "", // Need to update with database data
	"day_id": "", // Need to update with database data
  "activity": {
    "description": "Eat delicious pizza",
    "category": "Food"
  }
}

var testActivityDelete = {
	"user_id": "", // Need to update with database data
	"trip_id": "", // Need to update with database data
	"day_id": "", // Need to update with database data
  "activity_id": "" // Need to update with database data
}

// Set up POST request listener for creating a new user
// Expects to receive email and password in req.body
app.post('/api/signup', function(req, res) {
  console.log('Received the following POST request to create a user: ', req.body);
  // Mongoose method to create a user
  User.create(req.body, function(err, data) {
    if(err) {
      console.log('Error: ', err);
    } else {
      res.json(data);
    }
  });
});

// Set up POST request listener for signing in a user
// Expects to receive a user_id in req.body
app.post('/api/signin', function(req, res) {
  console.log('Received the following GET request for a user: ', req.body);
  // Mongoose method to retrieve a user
  User.findOne({
    'email': req.body.email
  }, function(err, data) {
    if(err) {
      console.log('Error: ', err)
    } else {
      res.json(data);
    }
  });
});

// Set up POST request listener for creating a new trip
// Expects to receive user_id and trip in req.body, where trip is an object with tripName and numDays properties
app.post('/api/trips', function(req, res) {
  console.log('Received the following POST request to create a trip: ', req.body);
  // Mongoose method to retrieve and update a user
  User.findOneAndUpdate({'_id': req.body.user_id}, {$push: { trips: req.body.trip } }, {new: true}, function(err, data) {
    if(err) {
      console.log('Error: ', err);
    } else {
      // Create a new day object in the days array for each day in numDays
      var trip_id = data.trips[data.trips.length - 1]['_id'];
      var day = data.trips[data.trips.length - 1].days;
      for(var i = 1; i <= req.body.trip.numDays; i++) {
        var dayObject = { dayNum: i };
        User.findOneAndUpdate({'_id': req.body.user_id, 'trips._id': trip_id}, {$push: { 'trips.$.days': dayObject } }, {new: true}, function(err, data) {
          if(err) {
            console.log('Error: ', err);
          }
        });
      }
      res.json(data);
    }
  });
});

// Set up POST request listener for creating a new activity
// Expects to receive user_id, trip_id, days_id, and activity in req.body,
// where activity is an object with description and category properties
app.post('/api/activities', function(req, res) {
  // Pass in request object that includes user id, trip object id, day object id, activity object
  console.log('Received the following POST request to create an activity: ', req.body);
  User.findById(req.body.user_id, function(err, data) {
    if(err) {
      console.log('Error: ', error);
    } else {
      data.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.push(req.body.activity);
      data.save();
      res.json(data);
    }
  });
});


// Set up DELETE request listener for deleting an activity
// Expects to receive user_id, trip_id, days_id, and activity_id in req.body
app.delete('/api/activities', function(req, res) {
  console.log('Received the following DELETE request to delete an activity', req.body);
  // Call Mongoose remove method on id matching the request
  User.findById(req.body.user_id, function(err, data) {
    if(err) {
      console.log('Error: ', error);
    } else {
      // The following code splices an individual activity out of the activities array
      // It needs to dive down into some nested layers to do so
      data.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.splice(
        data.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.indexOf(
          data.trips.id(req.body.trip_id).days.id(req.body.day_id).activities.id(req.body.activity_id)
        ), 1);
      data.save();
      res.json(data);
    }
  });
});

// data.sub1.id(_id1).sub2.id(_id2).field = req.body.something;

var port = process.env.PORT || 3000;
// var ip = process.env.IP || 'localhost';

app.listen(port, function() {
  console.log('Listening on port ' + port);
});


//=======================DYNAMICALLY CONNECT TO DEV VS LIVE MONGODB===========================
//
// var uristring =
//     process.env.MONGOLAB_URI ||
//     process.env.MONGOHQ_URL ||
//     'mongodb://localhost/HelloMongoose';
//
//     mongoose.connect(uristring, function (err, res) {
//       if (err) {
//       console.log ('ERROR connecting to: ' + uristring + '. ' + err);
//       } else {
//       console.log ('Succeeded connected to: ' + uristring);
//       }
//     });
