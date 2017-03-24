angular.module('listViewModule', ['hydraApp']).controller('activityController', ['$scope', '$http', 'User', function($scope, $http, User) {
  $scope.userData = User.userData;
}]);