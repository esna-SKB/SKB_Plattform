
var request = require('supertest');

describe('loading express', function () {
  var server;

  beforeEach(function () {
    delete require.cache[require.resolve('../server')];
    server = require('../server');
  });
  afterEach(function (done) {
    server.server.close(done)
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/')
    .expect(214, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
  it('200 get all users', function testPath(done) {
    request(server)
      .get('/user')
      .expect(200, done);
  });
  it('200 get articles for timeline', function testPath(done) {
    request(server)
      .get('/timeline/user/staerk12@gmail.com/course/article')
      .expect(200, done);
  });
  it('200 get all courses of a user', function testPath(done) {
    request(server)
      .get('/user/staerk12@gmail.com/course/')
      .expect(200, done);
  });
  it('200 get all users of a course', function testPath(done) {
    request(server)
      .get('/course/course1/user')
      .expect(200, done);
  });
  it('post enrollment responds with json', function testPath(done) {
    request(server)
      .post('/enrollment/user/staerk12@gmail.com/course/course1')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end(function(err, res) {
        if (err) {
        console.log("enrollment");
        console.log(err);
      } else {
        done(); 
        return res;
      }
    }); 
  });
});
