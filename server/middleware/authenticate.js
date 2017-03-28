var User = require('./../models/userModel');

// This function checks to see if the user has been authenticated to make a given request
// get JWT token to be sent with every private request to the server
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

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
};

module.exports = {authenticate};
