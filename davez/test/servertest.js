  var chai = require('chai');
  var chaiHttp = require('chai-http');
  var expect = chai.expect;
  var net = require('net');
  var fs = require('fs');
  var server = require('./../server');
  require(__dirname + '/../server');

  chai.use(chaiHttp);

  describe('Test tcp server', function () {
    before((done) => {
      server.listen(3000, () => {
        console.log('server listening on 3000');
        done();
      })
      .on('error', (err) => {
        console.log(err);
      });
    });
    after(() => {
      server.close(() => {
        console.log('closing server');
      });
    });
    it('request to be written to a file', function (done) {
      var client = net.connect({ port:3000 }, function() {
        client.write('sending data to a file now');
      });
      client.on('data', function(data) {
        fs.readFile(__dirname + '/../writtenfiles/' + data.toString() + '.txt', function(err, data2) {
          expect(data2.toString()).to.eql('sending data to a file now');
          client.end();
          done();
        });;
      });
    });
  });
