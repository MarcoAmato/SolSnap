const request = require('supertest');
const path = require('path');
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

// Test creating an NFT
describe('POST /create-nft', () => {
  it('should create an NFT and return the created NFT data', async () => {
    const nftData = {
      name: 'Test NFT',
      description: 'This is a test NFT',
    };
    const picturePath = path.join(__dirname, 'test-picture.jpg'); // Adjust the path to your test picture

    const response = await request(app)
      .post('/create-nft')
      .field('name', nftData.name)
      .field('description', nftData.description)
      .attach('picture', picturePath);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(nftData.name);
    expect(response.body.description).toBe(nftData.description);
    expect(response.body).toHaveProperty('picture'); // Check if picture path is returned
  });
});