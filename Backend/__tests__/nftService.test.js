// Import statements
const { uploadImage, createNFT } = require('../src/nftService');
const umi = require('@metaplex-foundation/umi-bundle-defaults');
const { assert } = require('console');
const { readFile } = require('fs/promises');

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
    console.log('Running test for uploadImage');

    var mockImage = null;
    // Setup
    // Read test image file
    try {
      mockImage = await readFile('./__tests__/test-picture.jpg');
      const imageSize = mockImage.length; // This will be an integer representing the size in bytes

      // Ensure imageSize is an integer
      if (!Number.isInteger(imageSize)) {
        throw new Error("Image size must be an integer. Found: " + imageSize);
      }

    } catch (error) {
      console.error("Error reading test image file:", error);
    }
    assert(mockImage != null);

    const mockName = 'testImage';
    const mockDescription = 'A test image';

    try {
      // Act
      console.log('Calling uploadImage...');
      const result = await uploadImage(mockImage, mockName, mockDescription);

      console.log('UploadImage result:', result);
      
      // Assert
      expect(result).toBeDefined();

    } catch (error) {
      // Catch
      fail(error);
    }
  }, 10000); // Increase timeout to 10 seconds. Sometimes the network request to Umi can take longer
  // than the default 5 seconds
});

/**
 * Test suite for createNFT
 * 
 * The createNFT function should create an NFT with given metadata and image, then return an object with success status, message, and NFT URI.
 */
describe('createNFT', () => {
  it('should create an NFT and return a success message with a valid URI', async () => {
    console.log('Running test for createNFT');

    const mockMetadata = {
      name: 'TestNFT',
      symbol: 'TNFT',
      description: 'A test NFT'
    };

    var mockImage = null;
    // Setup
    // Read test image file
    try {
      mockImage = await readFile('./__tests__/test-picture.jpg');
    } catch (error) {
      console.error("Error reading test image file:", error);
    }
    assert(mockImage != null, "Test image file must not be null");

    try {
      // Act
      console.log('Calling createNFT...');
      const result = await createNFT(mockMetadata, mockImage);

      console.log('createNFT result:', result);
      
      // Assert
      expect(result.success).toBeTruthy();
      expect(result.message).toBe("NFT created successfully");
      // Use a regex to match a valid URL format
      expect(result.nftUri).toMatch(/^(https?):\/\/[^\s$.?#].[^\s]*$/);
    } catch (error) {
      // Catch
      fail(error);
    }
  }, 10000); // Increase timeout to accommodate potential delays in NFT creation
});