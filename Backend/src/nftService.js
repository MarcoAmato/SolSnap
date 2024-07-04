// nftService.js
// const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");
// const { createUmi } = require("@metaplex-foundation/umi");
const {
  createNft,
  mplTokenMetadata,
} = require("@metaplex-foundation/mpl-token-metadata");
// Umi imports
const {
  publicKey,
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
  DefaultRpcImplementation 
} = require("@metaplex-foundation/umi");
const { irysUploader } = require("@metaplex-foundation/umi-uploader-irys");
const { base58 } = require("@metaplex-foundation/umi/serializers");

const { createUmi } = require("@metaplex-foundation/umi-bundle-defaults");

const umi = getUmiInstance();

function getUmiInstance() {
  
  const umi = createUmi("https://api.devnet.solana.com");
  // Initialize and register the RPC implementation
  // umi.rpc = new DefaultRpcImplementation();
  umi.use(irysUploader());
  // umi.use(mplTokenMetadata());

  // Get the public key from the secrets folder
  const photographerPK = require("../secrets/publicKey.json");
  const photographerKeyPair = umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array(photographerPK)
  );

  // Create a signer from the keypair
  const photographerKeypairSigner = createSignerFromKeypair(
    umi,
    photographerKeyPair
  );

  // Apply middleware
  umi.use(signerIdentity(photographerKeypairSigner)).use(mplTokenMetadata());

  return umi;
}

async function createNFT(metadata, image) {
  // Upload image to umi
  const uri = await uploadImage(image);

  // Connect to Solana cluster
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet")
  );

  // Logic to create and send NFT creation transaction
  // This is a placeholder. Actual implementation will depend on your NFT structure and Solana's requirements

  return {
    success: true,
    message: "NFT created successfully",
    // Include any other relevant data here
  };
}

/**
 * Uploads an image to UMI
 * @param {Buffer} image - The image to upload
 * @param {string} name - The name of the image
 * @param {string} description - A description for the image
 * @returns {string} - The URI of the uploaded image. Can be used to access the image later.
 */
async function uploadImage(image, name, description) {
  try {
    const uri = await umi.uploader.uploadJson({
      name: name,
      description: description,
      image: image,
    });
    return uri;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
}

module.exports = { uploadImage, createNFT };
