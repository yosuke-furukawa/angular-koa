
var request = require('supertest');
var api = require('../..');

describe('REST tweets', function(){
  describe('POST tweet', function(){
    it('should respond 201', function(done){
      var app = api();

      request(app.listen())
      .post('/tweets')
      .send({ body : "test" })
      .expect(201, done);
    })
    it('should respond 400 without body', function(done){
      var app = api();
      var message = "";
      request(app.listen())
      .post('/tweets')
      .send({ body :  message})
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.eql('.body required');
        done();
      });
    })
    it('should respond 400 max length exceed', function(done){
      var app = api();
      var message = "test exceed 140";
      var times = function(message, num) {
        var result = '';
        for (var i=0; i<num; i++) {
          result += message;
        }
        return result;
      };
      message = times(message, 10);
      request(app.listen())
      .post('/tweets')
      .send({ body :  message})
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);
        res.text.should.eql('.body is longer than maxlength');
        done();
      });
    })
  })
  describe('DELETE tweet', function(){
    it('should respond 200', function(done){
      var app = api();
      var id;

      var server = app.listen();
      request(server)
      .get('/tweets')
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        id = res.body[0]._id;
        request(server)
        .del('/tweets/' + id)
        .expect(200, done)
      })
    })
  })
  describe('GET tweet', function(){
    it('should respond 200', function(done){
      var app = api();
      var id;

      var server = app.listen();
      request(server)
      .get('/tweets')
      .expect(200)
      .end(function(err, res) {
        if(err) return done(err);
        id = res.body[0]._id;
        request(server)
        .get('/tweets/' + id)
        .expect(200, done)
      })
    })
  })
})
