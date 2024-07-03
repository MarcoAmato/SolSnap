import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import vincentium_broken from '../img/vincentium_broken.jpg';

class ImageData {
  constructor(public name: string, public src: string, public description: string) {}
}

function Gallery() {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const imageData = data.map((nft: any) => new ImageData(nft.name, nft.image, nft.description));
        setImages(imageData); // Update the state with fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const renderCardsForRow = (imagesForRow: ImageData[]) => {
    return imagesForRow.map((image, index) => (
      <Col sm={4} key={index}>
        <Card style={{ width: '18rem' }}>
          <img alt={image.name} src={image.src} />
          <CardBody>
            <CardTitle tag="h5">{image.name}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
            <CardText>{image.description}</CardText>
            <Button>Acquista</Button>
          </CardBody>
        </Card>
      </Col>
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
    <Container>
      {renderImageRows()}
    </Container>
  );
}

export default Gallery;





