var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Activity = require('./activity-model.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongoose.connect('mongodb://localhost/hydra');
//var db = mongoose.connection;

// Activity.create({
//   description: 'Ryan\'s Terrible Tacos',
//   category: 'food'
// });

// Code example included in https://github.com/expressjs/body-parser
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

// Serve static files. NEED TO UPDATE PATH
app.use(express.static(path.join(__dirname, '../client/')));

// Set up GET request listener for retrieiving links
// app.get('/api/activities', function(req, res) {
//   console.log('req.body: ', req.body);
//   Activity.find(function(err, data) {
//     console.log('data: ', data);
//     res.json(data);
//   });
// });

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
