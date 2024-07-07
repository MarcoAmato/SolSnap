// Import statements
const { uploadImage } = require('../src/nftService');
const umi = require('@metaplex-foundation/umi-bundle-defaults');

// Start server before all tests
beforeAll((done) => {
  console.log('Server started for testing');
  done();
});

// Close server after all tests
afterAll((done) => {
  server.close(() => {
    console.log('Server stopped after testing');
    done();
  });
});

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Setup mock UMI uploader
jest.mock('@metaplex-foundation/umi-bundle-defaults', () => ({
    createUmi: jest.fn().mockReturnValue({
      use: jest.fn(),
      uploader: {
        uploadJson: jest.fn(),
      },
      eddsa: {
        createKeypairFromSecretKey: jest.fn(),
      },
      // Add any missing properties or methods here
      // Example: Mocking a configuration object that includes rpcEndpoint
      config: {
        rpcEndpoint: 'https://example.solana.rpc.net',
      },
    }),
}));

jest.mock('@metaplex-foundation/umi-uploader-irys', () => ({
  irysUploader: jest.fn(),
}));

/**
 * Test suite for uploadImage
 * 
 * The uploadImage function should upload an image to the UMI uploader and return the URI of the uploaded image.
 */
describe('uploadImage', () => {
  it('should return a URI after uploading an image', async () => {

    // Setup
    const mockImage = readFile('test-picture');
    const mockName = 'testImage';
    const mockDescription = 'A test image';

    try {
      // Act
      const result = await uploadImage(mockImage, mockName, mockDescription);

      

      // Assert
      expect(result.uri).toBeDefined();
      expect(umi.createUmi().uploader.uploadJson).toHaveBeenCalledWith({
        name: mockName,
        description: mockDescription,
        image: mockImage,
      });

    } catch (error) {
      // Catch
      console.error(error);
    }
  }, 50000); // Increase timeout to 10 seconds. Sometimes the network request to Umi can take longer
  // than the default 5 seconds
});