'use strict';

var app = angular.module('angularKoaApp');
app.controller('MainCtrl',[ '$scope', 'Tweets', function ($scope, Tweets) {
  $scope.tweet = {};
  $scope.lastTweet = { _id : Infinity};
  $scope.tweets = Tweets.query();
  $scope.onRequest = false;
  $scope.update = function() {
    Tweets.save($scope.tweet, function() {
      $scope.tweets = Tweets.query();
      $scope.reset();
    });
  };
  $scope.loadMore = function() {
    if ($scope.tweets.length < 9) return;
    var lastTweet = $scope.tweets[$scope.tweets.length - 1];
    console.log('last tweet', lastTweet._id);
    console.log('scope last tweet', $scope.lastTweet._id);
    if (!$scope.onRequest && lastTweet._id < $scope.lastTweet._id) {
      $scope.onRequest = true;
      var tweets = Tweets.query({lastId : lastTweet._id}, function(){
        $scope.tweets = $scope.tweets.concat(tweets);
        $scope.lastTweet = lastTweet;
        $scope.onRequest = false;
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
