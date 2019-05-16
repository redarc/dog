const server = require('../dist/server');
const request = require('supertest')(server.app)
const should = require('should');

describe('Test API GET /dog/breeds', function() {
  it('respond with array', function(done) {
    request.get('/dog/breeds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.should.be.an.instanceOf(Array);
        if(err) throw err;
        done();
      });
  });
});


describe('Test API GET /dog/image?breed=bulldog', function() {
  it('respond with json', function(done) {
    request.get('/dog/image?breed=bulldog')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('images');
        if(err) throw err;
        done();
      });
  });
});

describe('Test API GET /dog/image?breed=bulldog&subbreed=english', function() {
  it('respond with json', function(done) {
    request.get('/dog/image?breed=bulldog&subbreed=english')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        res.body.should.have.property('images');
        if(err) throw err;
        done();
      });
  });
});
