// src/server.js

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const app = express();

const { uploadImage } = require('./nftService');

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
  const nftData = {
    id: nfts.length + 1,
    name: req.body.name,
    description: req.body.description,
    //TODO Fix url so that frontend can access it
    src: req.file.path,
  };

  // Upload the image to UMI
  const umiUri = uploadImage(req.file.path, req.body.name, req.body.description);
  // console.log(umiUri);
  nftData.url = umiUri;
  nfts.push(nftData);
  res.status(201).send(nftData);
});

// Export the app and a function to start the server
module.exports.app = app;
module.exports.start = (port) => {
  return app.listen(port, () => console.log(`Server listening on port ${port}`));
};