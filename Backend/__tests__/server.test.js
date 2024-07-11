const request = require('supertest');
const path = require('path');
const { app, start } = require('../src/server.js');

let server;

beforeAll((done) => {
  // Start the server before all tests
  server = start(3061); // Use your desired test port
  done();
});

afterAll((done) => {
  // Close the server after all tests
  if(server){
    server.close(done);
  }
});

// Test the server is running
describe('GET /server/hello', () => {
  it('responds with a message', async () => {
    const response = await request(app).get('/server/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Hello World' });
  });
});


// Test getting all NFTs for the first time
describe('GET /nfts', () => {
  it('responds with all NFTs', async () => {
    const response = await request(app).get('/nfts');
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
    expect(response.body).toHaveProperty('src'); // Check if picture path is returned
  });
});