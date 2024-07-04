// Import statements
const { uploadImage } = require('../src/nftService');
const umi = require('@metaplex-foundation/umi-bundle-defaults');

// Mocking umi.uploader.uploadJson
jest.mock('@metaplex-foundation/umi-bundle-defaults', () => ({
    uploader: {
        uploadJson: jest.fn()
    }
}));

describe('uploadImage', () => {
    it('should return a URI after uploading an image', async () => {
        // Expected value
        const expectedUri = 'https://example.com/image.jpg';

        // Setup
        const mockImage = Buffer.from('test-picture');
        const mockName = 'testImage';
        const mockDescription = 'A test image';

        umi.uploader.uploadJson.mockResolvedValue(expectedUri);

        // Act
        const uri = await uploadImage(mockImage, mockName, mockDescription);

        // Assert
        expect(uri).toEqual(expectedUri);
        expect(umi.uploader.uploadJson).toHaveBeenCalledWith({
            name: mockName,
            description: mockDescription,
            image: mockImage
        });
    });
});