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

// Serve static files.
app.use(express.static(path.join(__dirname, '../client/')));

//Set up GET request listener for retrieiving links
app.get('/api/activities', function(req, res) {
  console.log('Server GET req.body: ', req.body);
  Activity.find(function(err, data) {
    // console.log('Server GET data: ', data);
    res.json(data);
  });
});

// Set up POST request listener for adding a link
app.post('/api/activities', function(req, res) {
  console.log('Server POST req.body: ', req.body);
  Activity.create(req.body, function(err, data) {
    console.log('data: ', data);
    res.json(data);
  });
});

app.delete('/api/activities', function(req, res) {
  console.log('Server DELETE req.body: ', req.body);
  Activity.remove({
    '_id': req.body._id
  }, function( err, removed) {
    if (err) {
      console.log('Error!');
    } else {
      // console.log('Server DELETE response: ', removed);
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
