// src/server.ts

import express, { json, Express, Request, Response } from 'express';
import multer, { Multer } from 'multer';
import cors from 'cors';
import fs from 'fs';
import { createNFT } from './nftService'; // Ensure nftService is also a TypeScript file or has type declarations

interface NFT {
    id: number;
    name: string;
    description: string;
    symbol: string;
    url: string;
}

const upload: Multer = multer({ dest: 'uploads/' });
const app: Express = express();

const port: number = 3061;
let nfts: NFT[] = []; // This will store NFT data

app.use(json()); // For parsing application/json
app.use(cors()); // Enable CORS

// GET
// Test the server is running
app.get('/server/hello', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

// Get all NFTs
app.get('/nfts', (req: Request, res: Response) => {
    res.json(nfts);
});

// Endpoint to create an NFT
app.post('/create-nft', upload.single('picture'), async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }

    const imageBuffer: Buffer = fs.readFileSync(req.file.path);
    const metadata = {
        name: req.body.name,
        description: req.body.description,
        symbol: req.body.symbol,
    };

    try {
        const { success, message, nftUri } = await createNFT(metadata, imageBuffer);
        if (success) {
            const nftData: NFT = {
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

// Delete NFT by ID
app.delete('/nfts/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const index: number = nfts.findIndex(nft => nft.id === id);
    if (index === -1) {
        res.status(404).send('NFT not found');
    } else {
        nfts.splice(index, 1);
        res.status(204).send();
    }
});

// Export the app and a function to start the server
export { app };
export function start(port: number): void {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
}