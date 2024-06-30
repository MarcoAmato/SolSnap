const request = require('supertest');
const { app, start } = require('../src/server.js');

let server;

// Start server before all tests
beforeAll(() => {
  // Use a specific port for testing; ensure this port is free and not used by the app normally
  server = start(4000);
});

// Stop server after all tests
afterAll((done) => {
  server.close(done);
});

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