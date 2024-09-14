import { UserContext } from "../../../../contexts/user.context";
import { useAlert } from '../../../../contexts/alert.context';
import { Button, Container, Form } from 'react-bootstrap';
import { sendVerification } from './verification';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';

import './terms.styles.scss';

export const AcceptTerms = () => {
  const { currentUser } = useContext(UserContext);
  const addAlert = useAlert().addAutoCloseAlert;
  const [isChecked, setIsChecked] = useState({
    businessOwner: false,
    makeSales: false,
    uploadProducts: false,
    brandProducts: false,
    useDisplayName: false,
    selectAll: false,
  });

  const handleCheckboxChange = (checkbox) => {
    if (checkbox === 'selectAll') {
      setIsChecked({
        businessOwner: !isChecked.selectAll,
        makeSales: !isChecked.selectAll,
        uploadProducts: !isChecked.selectAll,
        brandProducts: !isChecked.selectAll,
        useDisplayName: !isChecked.selectAll,
        selectAll: !isChecked.selectAll,
      });
    } else {
      setIsChecked((prevState) => ({
        ...prevState,
        [checkbox]: !prevState[checkbox],
      }));
    }
  };
  
  const navigate = useNavigate();

  const handleAgreeButtonClick = async () => {
    const allChecked =
      Object.values(isChecked).filter((value) => value === true).length === 6;

    if (allChecked) {
      addAlert("info", 'Verification link sent to your email. Verify your account to commence commerce!');
      
      await sendVerification(currentUser?.email);
      navigate('/dashboard');
    } else {
      addAlert("warning", 'Accept our terms of use before proceeding!!!');
    }
  };

  return (
    <div className='terms-card'>
      <Container className="no-padding-container flex-just-center">
        <div className="card p-1 col-md-6 bg-gray">
          <div className='card-title'>
            <h6 className='mx-auto'>
              Let's create and model your brand, Together!
            </h6>
          </div>
          <br/>

          <div className="card bg-ws">
            <div className="card-body fs-smaller text-center">
              In order to start operating in the marketplace, sellers are required to comply with our <b>terms of service</b> below..
            </div>
          </div>
          <br/>

          <Form>
            <Form.Group controlId="acceptTermsCheckbox" className='card-body'>
              <div className='form-check'>
                <Form.Check 
                  type="checkbox"
                  label="Select All"
                  checked={isChecked.selectAll}
                  onChange={() => handleCheckboxChange('selectAll')}
                />

                <hr/>

                <Form.Check
                  type="checkbox"
                  label="I own a fashion or clothing business"
                  checked={isChecked.businessOwner}
                  onChange={() => handleCheckboxChange('businessOwner')}
                />

                <Form.Check
                  type="checkbox"
                  label="I adhere to Afro-fashion regulatory policy"
                  checked={isChecked.makeSales}
                  onChange={() => handleCheckboxChange('makeSales')}
                />

                <Form.Check
                  type="checkbox"
                  label="I will consistently upload and update my products"
                  checked={isChecked.uploadProducts}
                  onChange={() => handleCheckboxChange('uploadProducts')}
                />

                <Form.Check
                  type="checkbox"
                  label="I give Afro-fashion rights to brand my products"
                  checked={isChecked.brandProducts}
                  onChange={() => handleCheckboxChange('brandProducts')}
                />

                <Form.Check
                  type="checkbox"
                  label="I adhere to both local and Afro-fashion's user policy"
                  checked={isChecked.useDisplayName}
                  onChange={() => handleCheckboxChange('useDisplayName')}
                />
              </div>
            </Form.Group>

            <div className='card-actions'>
              <Button onClick={handleAgreeButtonClick}>
                I agree to these terms of service
              </Button>
            </div>
          </Form>

          <div className="card bg-wheat">
            <div className="card-footer fs-smaller text-center">
              When you are redirected, your verification progress is saved with the email associated to this account
              
              <p></p>You still have to continue verification from your email address to complete this process and get a seller badge
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};