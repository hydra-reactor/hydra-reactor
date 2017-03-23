var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Activity = require('./activity-model.js');
var User = require('./models/userModel.js');
var {authenticate} = require('./middleware/authenticate');


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
mongoose.connect('mongodb://localhost/hydra');
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, '../client/')));

//Set up GET request listener for retrieving links
app.get('/api/activities', function(req, res) {
  console.log('Server GET req.body: ', req.body);
  // Call Mongoose find method to retrieve all activities
  Activity.find(function(err, data) {
    if(err) {
      console.log('Error: ', err)
    } else {
      res.json(data);
    }
  });
});

// Set up POST request listener for adding an activity
app.post('/api/activities', function(req, res) {
  console.log('Server POST req.body: ', req.body);
  // Call Mongoose create method, passing in data from the request
  Activity.create(req.body, function(err, data) {
    if(err) {
      console.log('Error: ', err);
    } else {
      res.json(data);
    }
  });
});

// Set up DELETE request listener from deleting an activity
app.delete('/api/activities', function(req, res) {
  console.log('Server DELETE req.body: ', req.body);
  // Call Mongoose remove method on id matching the request
  Activity.remove({
    '_id': req.body._id
  }, function( err, removed) {
    if (err) {
      console.log('Error: ', err);
    } else {
      res.send(removed);
    }
  });
});

// app.post('/api/users', function(req, res) {
//   var user = {
//     email: 'test22@gmail.com',
//     password: 'pass123',
//     trips: [{
//       tripName: 'Trip to Greece',
//       days: [{
//         dayName: 'Day1',
//         activities: [{
//           activityName: 'swimming',
//           category: 'sport'
//         }, {
//           activityName: 'walking',
//           category: 'sightseeing'
//         }]
//       }]
//     }]
//   };
//
//   User.create(user, function(err, data) {
//     console.log('data: ', data);
//     res.json(data);
//   });
// });


// route to create new users
// app.post('/api/users', authenticate, function(req, res) {
app.post('/api/users', function(req, res) {
  // var {email, password} = req.body;
  var user = new User(req.body);

  user.save().then(() => {
    return user.generateToken();
  }).then(token => {
    res.header('x-auth', token).send(user);
  }).catch(err => {
    res.status(400).send(err);
  });
});

app.get('/api/me',  function (req, res) {
  var token = req.header('x-auth')
console.log('x-auth token', token);

  User.findByToken(token).then((user) => {
    console.log('user', user);
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((err) => {
    console.log('err', err);
    res.status(401).send(err);
  });
  res.send(req.user);
});

app.post('/api/login', function (req, res) {
  var {email, password} = req.body;
  // var body = {email, password};

  User.findByCredentials(email, password).then(user => {
    return user.generateToken().then(token => {
      res.header('x-auth', token).send(user);
    })
  }).catch(err => {
    res.status(400).send(err);
  })
  // res.send(body);
})



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
