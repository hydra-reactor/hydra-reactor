


angular.module('loginModule', ['hydraApp']).controller('loginController', ['$scope', '$http', 'User', function($scope, $http, User) {

  $scope.email = '';
  // $scope.password = '';
  $scope.signIn = User.signIn;
}]);




// angular.module('loginModule', [])

// .controller('loginController', function($scope, $http) {

// });