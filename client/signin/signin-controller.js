angular.module('signinModule', []).controller('signinController', ['$scope', '$http', 'User', function($scope, $http, User) {

  $scope.email = '';
  $scope.signIn = User.signIn;
  $scope.go = User.go;
}]);
