// Import necessary modules
import express, { json } from 'express';
import multer from 'multer';
import cors from 'cors';

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all requests
app.use(cors());

// Enable express to parse JSON bodies in requests
app.use(json());

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Placeholder for NFT generation and gallery retrieval logic
// These should be implemented in separate modules
import { generateNFT, getGallery } from './services/nftService';

// Routes
// Upload photo and generate NFT
app.post('/api/photos/upload', upload.single('photo'), async (req, res) => {
    try {
        const photoPath = req.file.path;
        const nftResult = await generateNFT(photoPath);
        res.status(201).send(nftResult);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// View gallery
app.get('/api/gallery', async (req, res) => {
    try {
        const userId = req.query.userId; // Assuming user ID is passed as a query parameter
        const gallery = await getGallery(userId);
        res.status(200).send(gallery);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`SolSnap API listening at http://localhost:${port}`);
});