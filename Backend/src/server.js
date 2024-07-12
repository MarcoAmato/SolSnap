// src/server.js

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const app = express();

const { createNFT } = require('./nftService');

const port = 3061;
let nfts = []; // This will store NFT data

app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS

// GET
// Test the server is running
app.get('/server/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Get all NFTs
app.get('/nfts', (req, res) => {
  res.json(nfts);
});

// Endpoint to create an NFT
app.post('/create-nft', upload.single('picture'), async (req, res) => {
  const imageBuffer = fs.readFileSync(req.file.path);
  const metadata = {
    name: req.body.name,
    description: req.body.description,
    symbol: req.body.symbol,
  };

  try {
    const { success, message, nftUri } = await createNFT(metadata, imageBuffer);
    if (success) {
      const nftData = {
        id: nfts.length + 1,
        name: metadata.name,
        description: metadata.description,
        symbol: metadata.symbol,
        url: nftUri,
      };
      nfts.push(nftData);
      res.status(201).send(nftData);
    } else {
      res.status(500).json({ error: message });
    }
  } catch (error) {
    console.error("Failed to create NFT:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the app and a function to start the server
module.exports.app = app;
module.exports.start = (port) => {
  return app.listen(port, () => console.log(`Server listening on port ${port}`));
};