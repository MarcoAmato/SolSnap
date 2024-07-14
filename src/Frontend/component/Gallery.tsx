import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';

class ImageData {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public symbol: string,
    public url: string
  ) { }
}

function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [modal, setModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [selectedImageUri, setSelectedImageUri] = useState<string>('');

  const toggle = () => setModal(!modal);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const imageData = data.map((nft: any) => new ImageData(nft.id, nft.name, nft.description, nft.symbol, nft.url));
        console.log('Fetched data:', imageData);
        setImages(imageData); // Update the state with fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const fetchImageUri = async (src: string) => {
    try {
      // First fetch to get the JSON response
      const initialResponse = await fetch(src);
      if (!initialResponse.ok) {
        throw new Error(`HTTP error! status: ${initialResponse.status}`);
      }
      const jsonData = await initialResponse.json();
      const imageUrl = jsonData.image; // Assuming the key for the image URL is "image"

      // Second fetch to get the binary data from the image URL
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error(`HTTP error! status: ${imageResponse.status}`);
      }
      const blob = await imageResponse.blob(); // Convert the response to a Blob
      console.log(`Blob type: ${blob.type}, size: ${blob.size}`); // Inspect Blob type and size
      return URL.createObjectURL(blob); // Create a URL for the Blob
    } catch (error) {
      console.error("Failed to fetch image URI", error);
      return ''; // Return a default or error image URI
    }
  };

  // Function to delete an NFT by its ID
  const deleteNFT = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Remove the deleted NFT from the local state to update the UI accordingly
      setImages(images.filter(image => image.id !== id));
      console.log(`NFT with id ${id} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete NFT:", error);
    }
  };

  const ImageCard = ({ image }: { image: ImageData }) => {
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
      fetchImageUri(image.url).then(setImageUri);
    }, [image.url]);

    const handleViewClick = async () => {
      setSelectedImage(image);
      const uri = await fetchImageUri(image.url);
      setSelectedImageUri(uri);
      toggle();
    };

    return (
      <Col sm={4}>
        <Card style={{ width: '18rem' }}>
          {imageUri ? <img src={imageUri} alt="Fetched content" /> : <p>Loading...</p>}
          <CardBody>
            <CardTitle tag="h5">{image.name}</CardTitle>
            <Button onClick={handleViewClick}>View details</Button>
          </CardBody>
        </Card>
      </Col>
    );
  };

  const renderCardsForRow = (imagesForRow: ImageData[]) => {
    return imagesForRow.map((image, index) => (
      <ImageCard key={index} image={image} />
    ));
  };

  const renderImageRows = () => {
    const rows = [];
    for (let i = 0; i < images.length; i += 3) {
      const imagesForRow = images.slice(i, i + 3);
      rows.push(
        <Row className='marginTop' key={i}>
          {renderCardsForRow(imagesForRow)}
        </Row>
      );
    }
    return rows;
  };

  return (
    <>
      <div className="App-gallery">
        <Container>
          {renderImageRows()}
        </Container>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>{selectedImage?.name}</ModalHeader>
        <ModalBody>
          {selectedImage && (
            <>
              {selectedImageUri ? (
                <img style={{ width: '30rem' }} src={selectedImageUri} alt="Fetched content" />
              ) : (
                <p>Loading...</p>
              )}
              <br />
              <p style={{ wordBreak: 'break-all' }}><strong>Description: </strong> {selectedImage.description}</p>
              <p><strong>Symbol: </strong> {selectedImage.symbol}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
        <a target="_blank" href={selectedImage?.url}><Button color="success">
            Nft details
          </Button></a>
          {selectedImage && (
            <Button color="danger" onClick={() => {
              deleteNFT(selectedImage.id);
              toggle();
            }}>
              Delete
            </Button>
          )}
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Gallery;
