angular.module('tweetServices', ['ngResource'])
.factory('Tweets', ['$resource',
         function($resource) {
           return $resource('/tweets/:id', {}, {
             query : {method: 'GET', params : {id : ''}, isArray : true}
           });
         }]);
