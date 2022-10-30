const should = require('should')
const supertest = require('supertest')
const request = supertest('localhost:3000')

//Test for upload
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

//Test for download
describe('download', function() {
    it('a file', function(done) {
       request.get('/')
              .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else res.should.have.status(200); // 'success' status
                  done();
              });
    });
});

//Test for conversion
describe('consersion', function() {
    it('a file', function(done) {
        let postData = {
            "imagePath": "uploads/1667117910126-1200px-Pinguicula_ne1.jpeg",
            "fileType": "png"
        }
       request.get('/')
              .send(postData)
              .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else res.should.have.status(200); // 'success' status
                  done();
              });
    });
});