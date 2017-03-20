var app = angular.module('hydraApp', []);

app.factory('Activities', function($http) {

  var postNewData = function(description, category, storage) {
    var req = {
      method: 'POST',
      url: '/api/activities',
      data: {
        description: description,
        category: category
      }
    };
    $http(req)
    // the following will be called asynchronously when the response is available
    .then(function successCallback(response) {
      console.log('postNewData success');
      storage.push(response.data);
    }, function errorCallback(error) {
      console.log('error!');
    });
  };

  var getData = function() {
    var req = {
      method: 'GET',
      url: '/api/activities'
    };
    return $http(req)
    // the following will be called asynchronously when the response is available
    .then(function successCallback(response) {
      console.log('Client getData response.data: ', response.data);
      return response.data;
    }, function errorCallback(error) {
      console.log('error!');
    });
  };

  var deleteActivity = function(activity) {
    var req = {
      method: 'DELETE',
      url: '/api/activities',
      data: activity
    };
    console.log('delete Activity request: ', req);
    $http(req)
    // the following will be called asynchronously when the response is available
    .then(function successCallback(response) {
      console.log('Client deleteActivity response: ', response);
    }, function errorCallback(error) {
      console.log('error!');
    });
  };

  return {
    postNewData: postNewData,
    getData: getData,
    deleteActivity: deleteActivity
  };

});

app.controller('activityController', ['$scope', '$http', 'Activities', function($scope, $http, Activities) {
  $scope.description = '';
  $scope.category = '';
  $scope.storage = [];
  // $scope.hello = 'Hail Hydra!';

  // if there's no text in the input field, don't do the post request
  // empty the input field after a post request
  $scope.postNewData = Activities.postNewData;
  $scope.getData = Activities.getData;
  $scope.deleteActivity = Activities.deleteActivity;

  $scope.getData().then(function(data) {
    $scope.storage = data;
  });

  // This code is needed to send data in an $http DELETE request.
  // Stack overflow issue that addresses this: http://stackoverflow.com/questions/37796227/body-is-empty-when-parsing-delete-request-with-express-and-body-parser
  $http.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
}]);

// every time getData is run, clear our the storage and then push our response into storage

// use ng-repeat on the index.html page to display each item in storage
