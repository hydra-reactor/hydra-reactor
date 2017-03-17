var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Activity = require('./activity-model.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

<<<<<<< 3e12e97917b4b083d00883b0df656c89a3fd190e
=======
//mongoose.connect('mongodb://localhost/hydra');
//var db = mongoose.connection;

// Activity.create({
//   description: 'Ryan\'s Terrible Tacos',
//   category: 'food'
// });
>>>>>>> temp commit

mongoose.connect('mongodb://heroku_0fn1fg98:vi2sk4eagfo3dj3pbg1407vr0l@ds133450.mlab.com:33450/heroku_0fn1fg98/hydra');
//mongoose.connect('mongodb://localhost/hydra');
var db = mongoose.connection;

// Serve static files.
app.use(express.static(path.join(__dirname, '../client/')));

<<<<<<< 3e12e97917b4b083d00883b0df656c89a3fd190e
//Set up GET request listener for retrieiving links
app.get('/api/activities', function(req, res) {
  console.log('req.body: ', req.body);
  Activity.find(function(err, data) {
    console.log('data: ', data);
    res.json(data);
  });
});
=======
// Set up GET request listener for retrieiving links
// app.get('/api/activities', function(req, res) {
//   console.log('req.body: ', req.body);
//   Activity.find(function(err, data) {
//     console.log('data: ', data);
//     res.json(data);
//   });
// });
>>>>>>> temp commit

// // Set up POST request listener for adding a link
// app.post('/api/activities', function(req, res) {
//   console.log('req.body: ', req.body);
//   Activity.create(req.body, function(err, data) {
//     console.log('data: ', data);
//     res.json(data);
//   });
// });

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
