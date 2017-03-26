angular.module('tripViewModule', ['hydraApp']).controller('tripViewController', ['$scope', '$location', '$http', 'User', function($scope, $location, $http, User) {
  $scope.userData = User.userData;
  $scope.newTrip = User.newTrip;
  $scope.user_id = $scope.userData.value['_id'];
  $scope.setTripIndex = User.setTripIndex;
  $scope.go = User.go;
  // $scope.newSignUp = User.newSignUp;
}]);
