angular.module('loginSplash', ['ngRoute', 'loginModule', 'signupModule', 'hydraApp'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: 'login/login.html',
    controller: 'loginController'
  })
  .when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'signupController'
  })
  .when('/listview', {
    templateUrl: 'list-view.html',
    controller: 'activityController'
  })
  .otherwise({
    redirectTo: '/login'
  });

  $locationProvider.hashPrefix('');
});

