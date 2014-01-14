
/**
 * Module dependencies.
 */

var responseTime = require('koa-response-time');
var ratelimit = require('koa-ratelimit');
var compress = require('koa-compress');
var logger = require('koa-logger');
var router = require('koa-router');
var static = require('koa-static');
var load = require('./lib/load');
var redis = require('redis');
var koa = require('koa');

/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development';

/**
 * Expose `api()`.
 */

module.exports = api;

/**
 * Initialize an app with the given `opts`.
 *
 * @param {Object} opts
 * @return {Application}
 * @api public
 */

function api(opts) {
  opts = opts || {};
  var app = koa();

  // logging

  if ('test' != env) app.use(logger());

  // x-response-time

  app.use(responseTime());

  // compression

  app.use(compress());

  var redisClient;
  if (process.env.REDISTOGO_URL) {
    var rtg = require('url').parse(process.env.REDISTOGO_URL);
    redisClient = redis.createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
  } else {
    redisClient = redis.createClient();
  }

  // rate limiting

  app.use(ratelimit({
    max: opts.ratelimit,
    duration: opts.duration,
    db: redisClient
  }));

  // static file serve
  app.use(static(__dirname + '/app'));
  app.use(static(__dirname + '/.tmp'));

  // routing

  app.use(router(app));

  // boot

  load(app, __dirname + '/api');

  return app;
}
