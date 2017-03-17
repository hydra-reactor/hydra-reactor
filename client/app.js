angular.module('hydraApp', [])

.controller('activityController', function($scope, $http) {
  $scope.description = '';
  $scope.category = '';
  $scope.storage = [];
  // $scope.hello = 'Hail Hydra!';

  // if there's no text in the input field, don't do the post request
  // empty the input field after a post request
  $scope.postNewData = function() {
    var req = {
      method: 'POST',
      url: '/api/activities',
      data: {
        description: $scope.description,
        category: $scope.category
      }
    };
    $http(req)
    .then(function successCallback(response) {
      $scope.storage.push(response.data);
      console.log($scope.storage);
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(error) {
      console.log('error!');
    });
  };

  $scope.getData = function() {
    var req = {
      method: 'GET',
      url: '/api/activities'
    };
    $http(req)
    .then(function successCallback(response) {
      $scope.storage = response.data;
      console.log(response);
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(error) {
      console.log('error!');
    });
  };
  $scope.getData();
});

// every time getData is run, clear our the storage and then push our response into storage

// use ng-repeat on the index.html page to display each item in storage



