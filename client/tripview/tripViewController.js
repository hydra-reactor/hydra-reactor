angular.module('tripViewModule', ['hydraApp']).controller('tripViewController', ['$scope', '$http', 'User', function($scope, $http, User) {
  $scope.userData = User.userData;
  User.trip = '';
  // $scope.newSignUp = User.newSignUp;
}]);


// angular.module('tripViewModule', [])

// ng-repeat="item in userData.trips"

// ng-initialize="trip=item"

// .controller('tripViewController', function($scope, $http) {

// })