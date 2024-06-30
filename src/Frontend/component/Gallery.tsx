import React from 'react';
import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import vincentium_broken from '../img/vincentium_broken.jpg';


class ImageData {
  constructor(public name: string, public src: string, public description: string) {}
}

// Sample data for the gallery
const images = [
  new ImageData("Foto 1", vincentium_broken, "Gnomo strano trovato in un bosco"),
  new ImageData("Foto 2", vincentium_broken, "Gnomo strano trovato in un bosco"),
  new ImageData("Foto 3", vincentium_broken, "Gnomo gay"),
  new ImageData("Foto 4", vincentium_broken, "Gnomo strano trovato in un bosco"),
  new ImageData("Foto 5", vincentium_broken, "Gnomo strano trovato in un bosco"),
];

function Gallery() {

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nfts`);
      const data = await response.json();
      // Update your state with this data
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

  // Function to render rows of images
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
