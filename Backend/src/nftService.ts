// nftService.ts
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  publicKey,
  createSignerFromKeypair,
  signerIdentity,
  createGenericFile,
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
  const umi: Umi = createUmi("https://api.devnet.solana.com", "finalized");
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

async function createNFT(metadata: any, image: Buffer): Promise<{ success: boolean; message: string; nftUri: string }> {
  // Uri will be populated with the URI of the uploaded image
  var uri: string;
  // nftUri will be populated with the URI of the created NFT
  var nftUri: string;

  // Upload the image to UMI
  try{
    uri = await uploadImage(image, metadata.name, metadata.description);
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, message: "Error uploading image", nftUri: ""};
  }

  // Create the NFT metadata
  const uploadData = {
    name: metadata.name,
    symbol: metadata.symbol,
    description: metadata.description,
    image: uri,
    attributes: [
        {
            trait_type: "Rarity",
            value: "Common"
        },
        {
            trait_type: "Author",
            value: "SolSnap"
        }
    ],
    proprieties: {
        files: [
            {
                type: "image/jpeg",
                uri: uri
            }
        ]
    }
  };

  // Upload the metadata to UMI and create the NFT
  try{
    nftUri = await umi.uploader.uploadJson(uploadData);
    console.log("Your Uri:", nftUri);
  } catch (error) {
    console.error("Error uploading metadata:", error);
    return { success: false, message: "Error uploading metadata", nftUri: ""};
  }

  return { success: true, message: "NFT created successfully", nftUri: nftUri};
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
    const nftImage = createGenericFile(image, name);
    const [uri] = await umi.uploader.upload([nftImage]);
    // const uri: string = await umi.uploader.uploadJson({
    //   name: name,
    //   description: description,
    //   image: image.toString('base64'),
    // });
    return uri;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow to handle it in the calling function
  }
}

export { uploadImage, createNFT };