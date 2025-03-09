const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const { app, server } = require('../server');

describe('API Tests', () => {
  // No need to start a server since we can use the app instance directly
  
  after((done) => {
    // Close the server after tests
    server.close(done);
  });
  
  it('should return welcome message on GET /', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Hello from Node.js CI/CD Pipeline!');
        done();
      });
  });
  
  it('should return health status on GET /health', (done) => {
    request(app)
      .get('/health')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('UP');
        done();
      });
  });
});