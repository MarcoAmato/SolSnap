const request = require('supertest');
const server = require('../src/server.js');


// Test the server is running
describe('GET /server/hello', () => {
  it('responds with a message', async () => {
    const response = await request(server).get('/server/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
  });
});


// Test getting all NFTs for the first time
describe('GET /nfts', () => {
  it('responds with all NFTs', async () => {
    const response = await request(server).get('/nfts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});