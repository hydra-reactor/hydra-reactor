var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Activity = require('./activity-model.js');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
//mongoose.connect('mongodb://localhost/hydra');
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
