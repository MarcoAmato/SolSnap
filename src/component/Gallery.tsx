import React from 'react';
import { useState, useEffect } from "react";
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import vincentium_broken from '../img/vincentium_broken.jpg';


function Gallery() {



  return (
    <>
    <Container className='marginTop'>
      <Row>
        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <img alt="Sample" src={vincentium_broken} />
            <CardBody>

              <CardTitle tag="h5">Foto 1</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
              <CardText>Gnomo strano trovato in un bosco</CardText>
              <Button>Acquista</Button>

            </CardBody>
          </Card>
        </Col>

        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <img alt="Sample" src={vincentium_broken} />
            <CardBody>

              <CardTitle tag="h5">Foto 2</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
              <CardText>Gnomo strano trovato in un bosco</CardText>
              <Button>Acquista</Button>

            </CardBody>
          </Card>
        </Col>

        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <img alt="Sample" src={vincentium_broken} />
            <CardBody>

              <CardTitle tag="h5">Foto 3</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
              <CardText>Gnomo strano trovato in un bosco</CardText>
              <Button>Acquista</Button>

            </CardBody>
          </Card>
        </Col>

      </Row>




      <Row className="marginTop">
        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <img alt="Sample" src={vincentium_broken} />
            <CardBody>

              <CardTitle tag="h5">Foto 4</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
              <CardText>Gnomo strano trovato in un bosco</CardText>
              <Button>Acquista</Button>

            </CardBody>
          </Card>
        </Col>


        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <img alt="Sample" src={vincentium_broken} />
            <CardBody>

              <CardTitle tag="h5">Foto 5</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
              <CardText>Gnomo strano trovato in un bosco</CardText>
              <Button>Acquista</Button>

            </CardBody>
          </Card>
        </Col>

        <Col sm={4}>
          <Card style={{ width: '18rem' }}>
            <img alt="Sample" src={vincentium_broken} />
            <CardBody>

              <CardTitle tag="h5">Foto 6</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">Descrizione</CardSubtitle>
              <CardText>Gnomo strano trovato in un bosco</CardText>
              <Button>Acquista</Button>

            </CardBody>
          </Card>
        </Col>

      </Row>
      </Container>
    </>
  );
}

export default Gallery;
