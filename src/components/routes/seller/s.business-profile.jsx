import { Form, Row, Container, Col} from "react-bootstrap";
import Button from 'react-bootstrap/Button';

const SellerBusiness = () => {
  return (
    <Container className="no-padding-container">
      <div className="card container y-m">
    <div className='card-header'>
          Fill in your business details
        </div>
        <div className='card-body'>
          <form  action=''>
        <Form>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Business Name</Form.Label>
          <Form.Control type="name" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="" />
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Phone 1</Form.Label>
          <Form.Control type="tel" placeholder="" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Phone 2</Form.Label>
          <Form.Control type="tel" placeholder="" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
   </form>
   </div>
   </div>
    </Container>
  );
}

export default SellerBusiness;
  
