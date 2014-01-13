'use strict';

var app = angular.module('angularKoaApp');
app.controller('MainCtrl',[ '$scope', 'Tweets', function ($scope, Tweets) {
  $scope.tweet = {};
  $scope.lastTweet = {};
  $scope.tweets = Tweets.query();
  $scope.update = function() {
    Tweets.save($scope.tweet, function() {
      $scope.tweets = Tweets.query();
      $scope.reset();
    });
  };
  $scope.loadMore = function() {
    if ($scope.tweets.length < 9) return;
    var lastTweet = $scope.tweets[$scope.tweets.length - 1];
    if (lastTweet._id !== $scope.lastTweet._id) {
      var tweets = Tweets.query({lastId : lastTweet._id}, function(){
        $scope.tweets = $scope.tweets.concat(tweets);
        $scope.lastTweet = lastTweet;
      });
    }
  };
  $scope.delete = function(tweet) {
    Tweets.delete(tweet);
  };
  $scope.reset = function() {
    $scope.tweet.body = '';
  };
}]);
