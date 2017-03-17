angular.module('hydraApp', []).controller('activityController', function($scope, $http) {
  $scope.activity = '';
  $scope.activityType = '';
  $scope.storage = [];
  // $scope.hello = 'Hail Hydra!';

  $scope.postNewData = function() {
    var req = {
      method: 'POST',
      url: '/',
      data: {
        activity: $scope.activity,
        activityType: $scope.activityType
        }
      };
    $http(req);
    // .then(function successCallback(response) {
    //     console.log(response);
    //     // this callback will be called asynchronously
    //     // when the response is available
    //   }, function errorCallback(error) {
    //     console.log('error!');
    //   });
  }
});





