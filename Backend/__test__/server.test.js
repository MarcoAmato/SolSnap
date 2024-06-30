const request = require('supertest');
const server = require('../src/server.js');

describe('GET /server/hello', () => {
  afterAll(done => {
    server.close(done);
  });

  it('responds with a message', async () => {
    const response = await request(server).get('/server/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
  });
});