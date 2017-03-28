angular.module('listViewModule', []).controller('activityController', ['$scope', '$http', 'User', function($scope, $http, User) {
  $scope.userData = User.userData;
  $scope.newActivity = User.newActivity;
  $scope.currentTripIndex = User.currentTripIndex;
  $scope.deleteActivity = User.deleteActivity;
}]);
