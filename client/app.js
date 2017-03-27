var app = angular.module('hydraApp', []);

app.factory('User', function($http, $window, $location, $rootScope) {

  var userData = $rootScope.userData;

  // POST request to create a new user
  var newSignUp = function(email, password) {
    var req = {
      method: 'POST',
      url: '/api/signup',
      data: {
        "email": email,
        "password": password
      }
    };
    console.log('Client sending newSignuUp request: ', req)
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        userData.value = response.data;
        // save JWT token in local sessionStorage
        sessionStorage.setItem('auth', response.data.tokens[0].token)
        window.location.href = '#/tripview';
      }, function errorCallback(error) {
        console.log('error!', error);
      });

  };

  // POST request to sign in a user
  var signIn = function(email, password){
    var req = {
      method: 'POST',
      url: '/api/signin',
      data: {email, password}
    };
    console.log('Client sending signin request: ', req);
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        userData.value = response.data;
        // save JWT token in local sessionStorage
        sessionStorage.setItem('auth', response.data.tokens[0].token)
        window.location.href = '#/tripview';
        // document.location.hash = '/tripview';
      }, function errorCallback(error) {
        console.log('error!', error);
      });
  };

var newTrip = function(user_id, tripName) {
    var req = {
      method: 'POST',
      url: '/api/trips',
      headers: {
        'x-auth': sessionStorage.getItem('auth')
      },
      data: {
        "user_id": user_id,  // Need to update with database data
        "trip": {
          "tripName": tripName
        }
      }
    };
    console.log('Client sending newTrip request: ', req);
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('Client receiving newTrip response: ', response);
        userData.value = response.data;
      }, function errorCallback(error) {
        console.log('error!', error);
      });

  };

  var newActivity = function(user_id, trip_id, description, category) {
    var req = {
      method: 'POST',
      url: '/api/activities',
      headers: {
        'x-auth': sessionStorage.getItem('auth')
      },
      data: {
        user_id: user_id,
        trip_id: trip_id,
        activity: {
          description: description,
          category: category
        }
      }
    };
    console.log('Client sending newActivity request: ', req);
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('Client receiving newActivity response: ', response);
        userData.value = response.data;
      }, function errorCallback(error) {
        console.log('error!', error);
      });
  };

  // Function to delete an activity
  var deleteActivity = function(user_id, trip_id, activity_id) {
    var req = {
      method: 'DELETE',
      url: '/api/activities',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-auth': sessionStorage.getItem('auth')
      },
      data: {
        "user_id": user_id,
        "trip_id": trip_id,
        "activity_id": activity_id
      }
    };
    console.log('Client sending deleteActivity request: ', req);
    // Pass the request object to an $http call
    $http(req)
    // the following will be called asynchronously when the response is available
    .then(function successCallback(response) {
      console.log('Client receiving deleteActivity response: ', response);
      userData.value = response.data;
    }, function errorCallback(error) {
      console.log('error!', error);
    });
  };

// A function to redirect the user to the specified path
  var go = function(path) {
    $location.path(path);
  };

// A variable to store the index the currently selected trip based on it's index
// inside the userData.trips array. This value is used to populate the correct list
// of trips inside the listview based on the current selected trip.
  var currentTripIndex = {
    value: 0
  };

// A function to set the trip index referenced above
  var setTripIndex = function(selectedTrip) {
    for(var i = 0; i < userData.value.trips.length; i++) {
      if(selectedTrip['_id'] === userData.value.trips[i]['_id']) {
        currentTripIndex.value = i;
      }
    }
    console.log('currentTripIndex.value: ', currentTripIndex.value);
  }

  return {
    userData: userData,
    newSignUp: newSignUp,
    newTrip: newTrip,
    newActivity: newActivity,
    deleteActivity: deleteActivity,
    signIn: signIn,
    setTripIndex: setTripIndex,
    currentTripIndex: currentTripIndex,
    go: go
  };
});


app.run(function ($http, $rootScope, $location) {
  //storage object, which will be equal to 'data' from an initial get request once the user signs in

  // The following value is very important, as it is what is used to populate the tripview and listview.
  // All $http requests receive an updated user object in the response, and that value
  // is used to update the 'value' property in the userData object below. The userData object
  // is then passed to all controllers via their $scope variables, so they can all use it
  // to populate data. Note: you cannot overwrite the userData variable itself or the controllers
  // will no longer be pointing to the same reference. That is why the 'value' property is used
  // to store the data. It is initialized to undefined and then overwritten when the user signs in.

  var userData = {
    value: undefined
  };

  if (sessionStorage.getItem('auth')) {
    var req = {
      method: 'GET',
      url: '/api/users',
      headers: {
        'x-auth': sessionStorage.getItem('auth')
      }
    };
    $http(req)
      .then(function successCallback(response) {
        userData.value = response.data;
        $location.path('/tripview');
      }, function errorCallback(error) {
        console.log('error!', error);
      });
  }

  $rootScope.userData = userData;

  // $rootScope.$on('$routeChangeStart', function (evt, next, current) {
  //   if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
  //     $location.path('/signin');
  //   }
  // });
});
