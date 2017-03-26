angular.module('tripCreatorModule', ['hydraApp']).controller('tripCreatorController', ['$scope', '$location', '$http', 'User', function($scope, $location, $http, User) {
  $scope.tripName = '';
  $scope.userData = User.userData;
  $scope.newTrip = User.newTrip;
  $scope.user_id = $scope.userData.value['_id'];
  $scope.setTrip = User.setTrip;
  $scope.go = User.go;
}]);
