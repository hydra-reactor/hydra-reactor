

<<<<<<< 93b6945f8dfbf8f30f3b83bb70faaf94ae0b25fa
angular.module('loginModule', ['hydraApp']).controller('loginController', ['$scope', '$http', 'User', function($scope, $http, User) {
=======
angular.module('loginSplash', []).controller('activityController', ['$scope', '$http', 'User', function($scope, $http, User) {
>>>>>>> misc commit
  $scope.email = '';
  // $scope.password = '';
  $scope.signIn = User.signIn;
}]);




// angular.module('loginModule', [])

// .controller('loginController', function($scope, $http) {

// });