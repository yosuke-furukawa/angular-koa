
/**
 * Module dependencies.
 */

var parse = require('co-body');
var monk = require('monk');
var monkWrapper = require('co-monk');
var db = process.env.MONGOLAB_URI ? monk(process.env.MONGOLAB_URI) : monk('localhost:27017/tweets');
var tweets = monkWrapper(db.get('tweets'));
var co = require('co');
var counter = require('./counter.js');
var listsNum = 10;

co(function *() {
  yield counter.init(db);
})();

/**
 * GET tweets.
 */

exports.index = function *(){
  var query = this.query;
  var lastId = Infinity;
  if (query.lastId) lastId = +query.lastId;
  var result = yield tweets.find({_id : { $lt : lastId}}, { sort : {_id : -1}, limit : listsNum });
  this.body = result;
};

/**
 * GET tweet by :id.
 */

exports.show = function *(id){
  this.body = yield tweets.findOne({ _id : +id});
};

/**
 * POST a new tweet
 */

exports.create = function *(body){
  var body = yield parse(this);
  if (!body.body) this.throw(400, '.body required');
  if (body.body.length > 140) this.throw(400, '.body is longer than maxlength');
  body.updatedAt =  (new Date() /1000) | 0;
  body._id = yield counter.next(db);
  yield tweets.insert(body);
  this.status = 201;
  this.body = 'added!';
};

exports.destroy = function *(id) {
  yield tweets.remove({_id : +id});
  this.status = 200;
  this.body = 'OK';
}
