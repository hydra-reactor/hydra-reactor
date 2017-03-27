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
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'listview/listview.html',
    controller: 'activityController'
  })
  .when('/tripview', {
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'tripview/tripview.html',
    controller: 'tripViewController'
  })
  .when('/tripcreator', {
    resolve: {
      check: function ($location) {
        if (!sessionStorage.getItem('auth')) {
          $location.path('/signin');
        }
      }
    },
    templateUrl: 'tripcreator/tripCreator.html',
    controller: 'tripCreatorController'
  })
  .otherwise({
    redirectTo: '/signin'
  });

  $locationProvider.hashPrefix('');
});
