angular.module('signinSplash', ['ngRoute', 'signinModule', 'signupModule', 'hydraApp', 'tripViewModule', 'listViewModule', 'tripCreatorModule'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/signin', {
    templateUrl: 'signin/signin.html',
    controller: 'signinController'
  })
  .when('/signup', {
    templateUrl: 'signup/signup.html',
    controller: 'signupController'
  })
  .when('/listview', {
    templateUrl: 'listview/listview.html',
    controller: 'activityController'
  })
  .when('/tripview', {
    templateUrl: 'tripview/tripview.html',
    controller: 'tripViewController'
  })
  .when('/tripcreator', {
    templateUrl: 'tripcreator/tripCreator.html',
    controller: 'tripCreatorController'
  })
  .otherwise({
    redirectTo: '/signin'
  });

  $locationProvider.hashPrefix('');
});
