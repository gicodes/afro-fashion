import FormField from "./form.component";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Button from '../../../buttons/button.component'
import { useNavigate, useLocation } from "react-router-dom";
import { customCreateUserWithEmail } from "../../../../utils/firebase.utils";
import { RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";

import "./sign-up.styles.scss";

import { logGoogleUser } from "../user-auth/logGoogle";

// This component embodies the first creation of sign-up (logic and UI) before rendering on other components
const SignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [ buyer, setBuyer ] = useState(true);
  
  useEffect(() => {
    // determine if user clicked seller route and...
    if (location.hash === '#seller') {
      setBuyer(false); //... set user to seller
    }
  }, [location.hash, setBuyer])

  const defaultFormFields = {
    userType: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const resetFormFields = () => { setFormFields(defaultFormFields) };
  const { userType, displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleChangeUser = () => {
    if(buyer) {
      setBuyer(false);
      navigate('#seller')
      return;
    };

    navigate('')
    setBuyer(true);
  }
  
  let userPath = '/auth';
  let sellerPath = '/seller/accept-terms'

  const handleSuccessNavigate = (path)=> {
    navigate(path);        
  }

  const HandleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return;
    }

    try {      
      await customCreateUserWithEmail(email, password, displayName, userType);
      
      if (userType === "seller"){
        alert('Seller Profile created successfully!');

        handleSuccessNavigate(sellerPath);
        return;
      } else {
        resetFormFields();
        alert('User created successfully. Go to sign in!');

        handleSuccessNavigate(userPath)
      }
    }
    catch (error) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          alert('Error creating user. Email already in use');
          break
        case 'auth/weak-password':
          alert('Your password must be at least 6 characters');
          break
        default: alert('Failed Operation! Try again...');;
      }
    }
  }

  return (
    <Container className="no-padding-container">
      <div className="card container sign-up-container">
        <div className="centered">
          <h4 className="title">Register</h4>
          <hr/>
        </div>

        <form onSubmit={HandleSubmit}>
          <div className="group">
            <div className="p-3 bg-ws -mt2">
              <FormLabel className="flex-just-center">
                <h6>Are you here to Buy or Sell?</h6>
              </FormLabel>

              <RadioGroup
                value={buyer ? 'buyer' : 'seller'}
                onChange={handleChange}
                name='userType'
              >
                <ol className="mx-auto -mb">
                  <FormControlLabel 
                    onClick={handleChangeUser} 
                    label="Buyer" control={<Radio />} 
                    value="buyer" name="userType" />
                  <FormControlLabel 
                    onClick={handleChangeUser} 
                    label="Seller" control={<Radio />} 
                    value="seller" name="userType" />
                </ol>
              </RadioGroup>
            </div>

            <div className="form-fields">
            <FormField
              label={'Display Name'}
              type='text' required
              onChange={handleChange}
              name='displayName'
              value={formFields.displayName}
            />

            <FormField
              label={'Email'}
              type='email' required
              onChange={handleChange}
              name='email'
              value={formFields.email}
            />
            
            <FormField
              label={'Password'}
              type='password' required
              onChange={handleChange}
              name='password'
              value={formFields.password}
              autoComplete='true'
            />

            <FormField
              label={'Confirm Password'}
              type='password' required
              onChange={handleChange}
              name='confirmPassword'
              value={formFields.confirmPassword}
              autoComplete='true'
            />
        
            <div className='buttons-container'>
              <Button type="submit">
                Sign Up
              </Button>
              {buyer && <Button
                type='button'
                buttonType='google'
                onClick={logGoogleUser}
              >
                Google Sign-up
              </Button>}
            </div>
          </div>
          </div>
        </form>

        <p className="centered z-footer"> 
          Already Registered? 
          <a href='/auth' className="zf-link"> &nbsp;Return to 
            sign in
          </a>
        </p>
        </div>
    </Container>
  )
}

export default SignUp;