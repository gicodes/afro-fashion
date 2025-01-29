import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-router-dom";
import React from 'react';

export const SearchAPage: React.FC = () => {
  return (
    <Form className="formWidth">
      <InputGroup className="my-3">
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
  )
}