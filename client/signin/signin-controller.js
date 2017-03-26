


angular.module('signinModule', ['hydraApp']).controller('signinController', ['$scope', '$http', 'User', function($scope, $http, User) {

  $scope.email = '';
  // $scope.password = '';
  $scope.signIn = User.signIn;
  $scope.go = User.go;
}]);




// angular.module('signinModule', [])

// .controller('signinController', function($scope, $http) {

// });
