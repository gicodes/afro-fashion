import React from "react";
import { Row, Col, Card, ListGroup, Container } from "react-bootstrap"; 

const SellerProfileCard = ({ displayName, email, phone, shopName, badge }) => {
  return (
    <Container className="no-padding-container">
      <div className="card container sign-in-container">
        <div className="p-4">
        <Row>
        <Col> 
        <img
        src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
        className="rounded-circle"
        alt="Avatar"
      /></Col>
        <Col> 
        <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
    </Card>
        </Col>
      </Row>
            
        </div>
        </div>
    </Container>
  );
};

export default SellerProfileCard;
