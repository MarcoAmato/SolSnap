// server.js

// imports
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const uploadImage = require('./nftService');


const app = express();
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
app.post('/create-nft', upload.single('picture'), (req, res) => {
  console.log("Received request to create NFT")

  const nftData = {
    id: nfts.length + 1,
    name: req.body.name,
    description: req.body.description,
    url: null, // This will be filled after the image is uploaded to UMI
  };

  // console.log(nftData);
  // console.log(nftData.url);
  
  // Upload the image to UMI
  const umiUri = uploadImage(req.file.path, req.body.name, req.body.description);
  // console.log(umiUri);
  nftData.url = umiUri;

  nfts.push(nftData);
  res.status(201).send(nftData);
});

// Export the app, a function to start the server, and the server instance
module.exports.app = app;
module.exports.start = (port) => {
  if (!module.parent) { // Prevent server from auto-starting when imported
    return app.listen(port, () => console.log(`Server listening on port ${port}`));
  }
};