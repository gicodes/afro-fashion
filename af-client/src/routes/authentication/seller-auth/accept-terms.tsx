import './terms.styles.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { sendVerification } from './verification.ts';
import UserContext from "../../../contexts/user.context.tsx";
import { useAlert } from '../../../contexts/alert.context.tsx';

export const AcceptTerms: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  const addAlert = useAlert().addAutoCloseAlert;
  const [isChecked, setIsChecked] = useState({
    businessOwner: false,
    makeSales: false,
    provideInfo: false,
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
        provideInfo: !isChecked.selectAll,
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

  let email = currentUser?.email || window.localStorage.getItem('emailForSignIn');
  if (!email) email = window.prompt('Please provide your email for confirmation');

  const handleAgreeButtonClick = async () => {
    const allChecked = Object.values(isChecked).every((value) => value === true);

    if (allChecked) {
      addAlert("info", 'Verification link sent to your email. Verify your account to commence commerce!');

      await sendVerification(email);
      navigate('/dashboard');
    } else {
      addAlert("warning", 'Accept Terms of Use before proceeding');
    }
  };

  return (
    <div className="terms-card">
      <Card className="p-2 mw-750">
        <div className='card-title'>
          <p>Let's create and model your brand, Together!</p>
        </div>

        <div className="card bg-ws w-80 mx-auto">
          <div className="card-body text-center fs-smaller">
            In order to start operating in the marketplace, 
            sellers are required to comply with our <b className="block">Terms Of Service</b>.
          </div>
        </div>

        <Form className='card-body'>
          <Form.Group className='px-2'>
            <div className='form-check mt-4'>
              <Form.Check 
                className="form-check-box"
                type="checkbox"
                label="Select All"
                checked={isChecked.selectAll}
                onChange={() => handleCheckboxChange('selectAll')}
              />
              <hr/>

              <Form.Check
                type="checkbox" 
                className="centered-checkbox"
                label="I run a fashion, clothing or styling business"
                checked={isChecked.businessOwner}
                onChange={() => handleCheckboxChange('businessOwner')}
              />

              <Form.Check
                type="checkbox"
                className="centered-checkbox"
                label="I agree to adhere to Afro-fashion's policies, protocols, and all relevant local regulations"
                checked={isChecked.makeSales}
                onChange={() => handleCheckboxChange('makeSales')}
              />

              <Form.Check
                type="checkbox"
                className="centered-checkbox"
                label="I am responsible for consistently uploading and updating product information to ensure accuracy and relevance"
                checked={isChecked.uploadProducts}
                onChange={() => handleCheckboxChange('uploadProducts')}
              />

              <Form.Check
                type="checkbox"
                className="centered-checkbox"
                label="I agree to provide any formal and financial documents or information required during business registration or vetting"
                checked={isChecked.provideInfo}
                onChange={() => handleCheckboxChange('provideInfo')}
              />  

              <Form.Check
                type="checkbox"
                className="centered-checkbox"
                label="I grant Afro-fashion the right to use and brand my products in line with marketplace promotional activities"
                checked={isChecked.brandProducts}
                onChange={() => handleCheckboxChange('brandProducts')}
              />

              <Form.Check
                type="checkbox"
                className="centered-checkbox"
                label="I agree to adhere to Afro-fashion’s user policies and any applicable local laws regarding product quality and customer service"
                checked={isChecked.useDisplayName}
                onChange={() => handleCheckboxChange('useDisplayName')}
              />
            </div>
          </Form.Group>

          <div className='card-actions'>
            <Button onClick={handleAgreeButtonClick}>
              I agree to these Terms Of Service
            </Button>
          </div>
        </Form>

        <div className="card container bg-wheat">
          <div className="card-body px-3 fs-smaller text-center">
            <p>When redirected, your verification progress is saved with the email associated to this account. 
              You still need to continue with your email to complete the process and earn your seller badge.</p>
            <span> We advise sellers to sign out their accounts unless for security reasons or changing device.</span>
          </div>
        </div>
      </Card>
    </div>
  );
};