// nftService.ts
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  publicKey,
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
  Umi,
  Keypair,
  Signer,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import * as solanaWeb3 from "@solana/web3.js";
import fs from "fs";

const umi: Umi = getUmiInstance();

function getUmiInstance(): Umi {
  const umi: Umi = createUmi("https://api.devnet.solana.com");
  umi.use(irysUploader());

  const photographerPK: Uint8Array = new Uint8Array(
    JSON.parse(fs.readFileSync("./secrets/publicKey.json", "utf-8"))
  );
  const photographerKeyPair: Keypair = umi.eddsa.createKeypairFromSecretKey(
    photographerPK
  );

  const photographerKeypairSigner: Signer = createSignerFromKeypair(
    umi,
    photographerKeyPair
  );

  umi.use(signerIdentity(photographerKeypairSigner)).use(mplTokenMetadata());

  return umi;
}

async function createNFT(metadata: any, image: Buffer): Promise<{ success: boolean; message: string }> {
  const uri: string = await uploadImage(image, metadata.name, metadata.description);

  const connection: solanaWeb3.Connection = new solanaWeb3.Connection(
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
async function uploadImage(image: Buffer, name: string, description: string): Promise<string> {
  try {
    const uri: string = await umi.uploader.uploadJson({
      name: name,
      description: description,
      image: image.toString('base64'),
    });
    return uri;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow to handle it in the calling function
  }
}

export { uploadImage, createNFT };