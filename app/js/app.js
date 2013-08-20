'use strict';

var app = angular.module('stopwatch', []);

app.config(function($routeProvider) {
  $routeProvider
    .when('/home',
      {
        controller: 'StopwatchCtrl',
        templateUrl: 'partials/home.html'
      })
    .when('/about',
      {
        templateUrl: 'partials/about.html'
      })
    .otherwise({redirectTo: '/home'});
});
