var monk = require('monk');
var monkWrapper = require('co-monk');

exports.init = function *(db) {
  var counters = monkWrapper(db.get('counters'));
  var count = yield counters.findOne({_id : 'tweet_id'});
  if (count) return;
  yield counters.insert({_id : "tweet_id", seq : 0});
};

exports.next = function *(db) {
  var counters = monkWrapper(db.get('counters'));
  var count = yield counters.findAndModify({
    query : {_id : "tweet_id" }, 
    update : { $inc : {seq : 1} },
    new : true
  });
  return count.seq;
};
