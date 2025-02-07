import React from "react";
import "./help.styles.scss";
import { HelpCard } from './help-contents.tsx';
import { Col, Button, Row } from "react-bootstrap";
import { HelpList } from "./help-list.component.tsx";

export const Help: React.FC = () => {
  return (
    <div className="card p-2 mb-2">
      <div className="card-title">
        <h3 className="text-center mx-auto bg-ws p-3">Support</h3>
      </div>
      <div className="card container help-container">  
        <div className="d-lg-flex">
          <HelpList />
          <hr/>
        </div>

        <div className="p-3 text-center">
          <div className="help-heading help-search">
            <h4>Welcome to Afrofashion</h4>
            <p>Support Center</p>
          </div>

          <section className="help-center">
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
                  Track Orders
                </Button>
              </Col>
              <Col>
                <Button variant="outline-secondary" href="" className="fixed-width-button">
                  Seller Services 
                </Button>
              </Col>
              <Col>
              <Button variant="outline-secondary" href="https://wa.me/2347066207973" className="fixed-width-button">                  
                Chat with Support
              </Button>
              </Col>
            </Row>
          </section>
        </div>
        <div>
          <HelpCard />
        </div>
      </div>
    </div>
  );
};
