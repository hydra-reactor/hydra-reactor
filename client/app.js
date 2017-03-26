var app = angular.module('hydraApp', []);
app.factory('User', function($http, $window, $location) {
//storage object, which will be equal to 'data' from an initial get request once the user signs in
  var userData = {
    value: {
      user_id: '1234567',
      trips: [
        {
          _id: '123',
          tripName: 'Hawaii Vacation',
          activities: [
            {
              activity_id: '32hhwhaseh',
              description: 'Eat Delicious Pizza',
              category: 'Food'
            },
            {
              activity_id: 'bhwh2hdhsh',
              description: 'Go Dancing',
              category: 'Nightlife'
            },
            {
              activity_id: 'bh3hw2shae',
              description: 'Surf',
              category: 'Exercise'
            }
          ]
        },
        {
          _id: '456',
          tripName: 'Vegas Vacation',
          activities: [
            {
              activity_id: '2hjdsiud2',
              description: 'All-you-can-eat buffet',
              category: 'Food'
            },
            {
              activity_id: 'fjdisunf83',
              description: 'Watch Carrot Top Live',
              category: 'Entertainment'
            },
            {
              activity_id: 'sfjk3juf8e',
              description: 'Bet it all on black',
              category: 'Nightlife'
            },
            {
              activity_id: 'fsnmnwifu8',
              description: 'Continue to make poor decisions',
              category: 'Other'
            }
          ]
        }
      ]
    }
  };

  // POST request to create a new user
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
        userData.value = response.data;
        localStorage.setItem('auth', response.data.tokens[0].token)
        window.location.href = '#/tripview';
      }, function errorCallback(error) {
        console.log('error!');
      });

  };

  // POST request to sign in a user
  var signIn = function(email, password){
    console.log('signIn is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/signin',
      data: {email, password}
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        userData.value = response.data;
        localStorage.setItem('auth', response.data.tokens[0].token)
        console.log(userData);
        window.location.href = '#/tripview';
        // document.location.hash = '/tripview';
      }, function errorCallback(error) {
        console.log('error!');
      });
  };

var newTrip = function(user_id, tripName) {
    console.log('newTrip is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/trips',
      headers: {
        'x-auth': localStorage.getItem('auth')
      },
      data: {
        "user_id": user_id,  // Need to update with database data
        "trip": {
          "tripName": tripName
        }
      }
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('newTrip success');
        console.dir(response);
        console.log('the returned data is:', response.data);
        userData.value = response.data;
        console.log(userData);
      }, function errorCallback(error) {
        console.log('error!');
      });

  };

  var newActivity = function(user_id, trip_id, description, category) {
    console.log('newActivity is getting invoked!');
    var req = {
      method: 'POST',
      url: '/api/activities',
      headers: {
        'x-auth': localStorage.getItem('auth')
      },
      data: {
        "user_id": user_id,
        "trip_id": trip_id,
        "activity": {
          "description": description,
          "category": category
        }
      }
    };
    $http(req)
      // the following will be called asynchronously when the response is available
      .then(function successCallback(response) {
        console.log('newActivity success');
        console.dir(response);
        console.log('the returned data is:', response.data);
        userData.value = response.data;
        console.log(userData);
      }, function errorCallback(error) {
        console.log('error!');
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
    signIn: signIn,
    setTripIndex: setTripIndex,
    currentTripIndex: currentTripIndex,
    go: go
  };
});
