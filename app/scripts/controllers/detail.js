'use strict';

angular.module('angularKoaApp')
  .controller('DetailCtrl', ['$scope', '$routeParams', '$location', 'Tweets', function ($scope, $routeParams, $location, Tweets) {
    $scope.tweet = Tweets.get({id : $routeParams.id});
    $scope.delete = function(id) {
      Tweets.delete({id : id});
      $location.path('/');
    }
  }]);

