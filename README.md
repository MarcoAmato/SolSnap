# SolSnap
This project aims to create a platform for the instant generation of NFTs from a photo taken by a camera, in order to guarantee the integrity and uniqueness of the photos. The photos taken by the user are immediately converted into NFTs and added to an image gallery available for the user.

# Domain Model
The domain model is composed of the following entities:
- User: A user can upload photos to the platform and view the gallery.
- Photo: A photo is an image taken by the user and uploaded to the platform. This photo is associated with an NFT and can be seen in the user Gallery.
- Gallery: A collection of images taken by the user and uploaded to the platform. It has an associated NFT.

# Project Components
The project is divided into the following components:
- Frontend: The frontend is a web application that allows the user to take photos and upload them to the platform. It also allows the user to view the gallery of photos.
- Backend: The backend is a server that receives the photos taken by the user and generates the NFTs associated with them. It also stores the photos and NFTs in a database.

## Frontend
The frontend pages are:
- Home: The home page of the application where the user can take photos or access the gallery.
    - Take Photo: When the user clicks on the "Take Photo" button, the camera is activated, and the user can take a photo.
    - Access Gallery: When the user clicks on the "Access Gallery" button, the user is redirected to the gallery page.
- Gallery: The gallery page where the user can view the photos taken and uploaded to the platform.
    - Lists the photos taken by the user. Each photo has a preview image and a button to view the photo details.
- Photo Details: The photo details page where the user can view the details of a photo.

## Backend
The backend components are:
- API: The API receives the photos taken by the user and generates the NFTs associated with them. It also stores the photos and NFTs in a database. It follows this process:
    - Receive Photo: The API receives the photo taken by the user along with metadata (image description, place where the pic was taken).
    - The Server sends a SOL payment request to the user's wallet. This request amount is the sum of:
        - The amount to be paid to the chain for the NFT generation.
        - The amount to be paid to SolSnap for the service.
    - If the payment is successful the NFT is generated and the photo is stored in the database.
    - Store Photo and NFT: The API stores the photo and NFT in the database.
    - The picture is now available in the gallery.
