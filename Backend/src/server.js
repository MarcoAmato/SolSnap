// 1. Import express and multer
// 2. Initialize express app
// 3. Define a port
// 4. Create an in-memory array to store NFT data
// 5. Define a POST route for '/create-nft' that:
//    a. Accepts NFT data and picture files
//    b. Saves the data to the in-memory array
// 6. Start the server on the defined port

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3061;

let nfts = []; // This will store NFT data

app.use(express.json()); // For parsing application/json

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
    picture: req.file.path,
  };
  nfts.push(nftData);
  res.status(201).send(nftData);
});

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app and a function to start the server
module.exports.app = server;
module.exports.start = (port) => {
  return app.listen(port, () => console.log(`Server listening on port ${port}`));
};