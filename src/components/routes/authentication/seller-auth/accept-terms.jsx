import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';

import './terms.styles.scss';
import { sendVerification } from './verification';
import { UserContext } from "../../../../contexts/user.context";

export const AcceptTerms = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState({
    businessOwner: false,
    makeSales: false,
    uploadProducts: false,
    brandProducts: false,
    useDisplayName: false,
  });

  const handleCheckboxChange = (checkbox) => {
    setIsChecked((prevState) => ({
      ...prevState,
      [checkbox]: !prevState[checkbox],
    }));
  };

  const handleAgreeButtonClick = async () => {
    const allChecked =
      Object.values(isChecked).filter((value) => value === true).length === 5;

    if (allChecked) {
      alert('Verification link sent... Verify your account to commence commerce!')
      await sendVerification(currentUser?.email)
      navigate('/seller');
    } else {
      alert('Accept our terms of use before proceeding!!!');
    }
  };

  return (
    <Container className="terms-card flex-just-center">
      <div className="card p-1 col-md-6 bg-gray">
        <div className='card-title flex-just-center'>
          <h6>Let's create and model your brand, together!</h6>
        </div>
        <hr/>

        <Form>
          <Form.Group controlId="acceptTermsCheckbox" className='card-body'>
            <div className='form-check'>
            <Form.Check
              type="checkbox"
              label="I am a business owner"
              checked={isChecked.businessOwner}
              onChange={() => handleCheckboxChange('businessOwner')}
            />
            <Form.Check
              type="checkbox"
              label="I'm looking to make sales with this platform"
              checked={isChecked.makeSales}
              onChange={() => handleCheckboxChange('makeSales')}
            />
            <Form.Check
              type="checkbox"
              label="I'll consistently upload and update my products"
              checked={isChecked.uploadProducts}
              onChange={() => handleCheckboxChange('uploadProducts')}
            />
            <Form.Check
              type="checkbox"
              label="I give this platform rights to brand my products"
              checked={isChecked.brandProducts}
              onChange={() => handleCheckboxChange('brandProducts')}
            />
            <Form.Check
              type="checkbox"
              label="Use my display name as a brand"
              checked={isChecked.useDisplayName}
              onChange={() => handleCheckboxChange('useDisplayName')}
            />
            </div>
          </Form.Group>

          <div className='card-actions'>
            <Button onClick={handleAgreeButtonClick}>
              I agree to these terms of use
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};