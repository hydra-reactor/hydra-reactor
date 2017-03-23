angular.module('tripViewModule', ['hydraApp']).controller('tripViewController', ['$scope', '$http', 'User', function($scope, $http, User) {
  $scope.email = '';
  $scope.password = '';
  $scope.newSignUp = User.newSignUp;
}]);


// angular.module('tripViewModule', [])

// .controller('tripViewController', function($scope, $http) {

// })