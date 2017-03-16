var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Code example included in https://github.com/expressjs/body-parser
// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })

// Serve '/' page, update with index.html path. NEED TO UPDATE PATH
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'), function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });
});

// Serve static files


// Set up GET request listener for retrieiving links
app.get(req, res)

// Set up POST request listener for adding a link

var port = process.env.PORT || 3000;
// var ip = process.env.IP || 'localhost';

app.listen(port, function() {
  console.log('Listening on port ' + port);
});
