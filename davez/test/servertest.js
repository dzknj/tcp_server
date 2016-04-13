var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var net = require('net');
var fs = require('fs');
require(__dirname + '/../server');

chai.use(chaiHttp);

describe('Test tcp server', function () {
    it('request to be written to a file', function (done) {

        // Set up a client and connect to port 31337 (or whatever port you use)
        var client = net.connect({ port:3000 },
            function() {
                // Send some data
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
