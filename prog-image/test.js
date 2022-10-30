const should = require('should')
const supertest = require('supertest')
const request = supertest('localhost:3000')

describe('upload', function() {
    it('a file', function(done) {
       request.post('/uploadImages')
              .field('extra_info', '{"in":"case you want to send json along with your file"}')
              .attach('image', '/Users/mrinalkadam/Downloads/1524510531.jpeg')
              .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else res.should.have.status(200); // 'success' status
                  done();
              });
    });
});