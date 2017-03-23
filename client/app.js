var app = angular.module('hydraApp', []);

app.factory('User', function($http) {

//storage object, which will be equal to 'data' from an initial get request once the user signs in
  var userData = {};
  //get request to pull in user info
  var newSignUp = function(email, password) {
    console.log('newSignUp is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/signup',
      data: {
        "email": email,
        "password": password
      }
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('newSignUp success');
        console.dir(response);
        console.log('the returned data is:' + response.data);
        userData = response.data;
        console.log(userData);
      }, function errorCallback(error) {
        console.log('error!');
      });

  };

  return {
    userData: userData,
    newSignUp: newSignUp
//     deleteActivity: deleteActivity
  };

  var newTrip = function() {};

});