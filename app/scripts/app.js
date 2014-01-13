'use strict';

angular.module('angularKoaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'tweetServices',
  'infinite-scroll'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tweet.html',
        controller: 'MainCtrl'
      })
      .when('/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl'
      })
      .otherwise({
        redirectTo : '/'
      });
  });
