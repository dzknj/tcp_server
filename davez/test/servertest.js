var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var myServer = require(__dirname + '/../server.js');

chai.use(chaiHttp);

describe('server.js', () => {
  it('should respond with a 200 status', ()=> {
    chai.request('localhost:3000').get('/')
    .end(function (err, res) {
      expect(err).to.be.null;
      expect(res).to.have.status(200);
    });
  });
});
