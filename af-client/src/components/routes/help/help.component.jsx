import React from "react";
import {
  Form,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "./help.styles.scss";
import { HelpList } from "./help-list.component";
import { HelpCard } from "./help-card.component";

export const Help = () => {
  return (
    <div className="card p-2 mb-2">
      <div className="card-title">
        <h3 className="text-center mx-auto bg-ws p-3">Help Desk</h3>
      </div>
      <div className="card container help-container">
        <div className="p-3 text-center">
          <section className="help-heading -mt2">
            <h4>Welcome to AfroFashion Docs</h4>
            <p>Documentation and References</p>
            <Form className="formWidth">
              <InputGroup className="mb-4 mt-4">
                <FormControl
                  placeholder="Search for help..."
                  aria-label="Search for support"
                  aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
          </section>
          <section className="helpCenter">
            <Row>
              <Col>
                <Button variant="outline-secondary" href="#products" className="fixed-width-button">
                  Products
                </Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" href="#brands-management" className="fixed-width-button">
                  Brands
                </Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" href="#subscription" className="fixed-width-button">
                  Subscriptions
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button variant="outline-secondary" href="#user-management" className="fixed-width-button">
                  Track past Orders
                </Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" href="https://wa.me/2349021486959" className="fixed-width-button">
                  Chat with an Agent 
                </Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" href="#shipping" className="fixed-width-button">
                  Shopping and Delivery
                </Button>
              </Col>
            </Row>
          </section>
        </div>
        <hr />
        <div className="d-lg-flex mt-4">
          <HelpList />
          <HelpCard />
        </div>
      </div>
    </div>
  );
};
