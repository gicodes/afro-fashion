import FormField from "./form.component";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import Button from '../../../buttons/button.component'
import { useNavigate, useLocation } from "react-router-dom";
import {
  createUserDocFromAuth,
  createAuthUserWithEmailandPassword,
} from "../../../../utils/firebase.utils";
import { RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";

import { logGoogleUser } from "../user-auth/logGoogle";

// SignUp takes a username and password, with multiple fields and functions
const SignUp = () => {

  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const resetFormFields = () => { setFormFields(defaultFormFields) };
  const { displayName, email, password, confirmPassword } = formFields;

  const location = useLocation();
  const navigate = useNavigate();

  const [ buyer, setBuyer ] = useState(true);
  
  useEffect(() => {
    // simple logic to determine if user clicked seller route and...
    if (location.pathname !== '/auth/register') {
      setBuyer(false); //... set seller
    }
  }, [location.pathname])

  let path = 'auth/register'; 

  const handleChange = (event) => {
    const { value } = event.target;
    setFormFields({ ...formFields, [email]: value, [displayName]: value });
  }

  const handleChangeUser = () => {
    if(buyer) {
      setBuyer(false);
      return;
    };

    setBuyer(true);
  }

  // handle auth logic for single component operation
  const HandleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailandPassword(
        email, password
      );
      await createUserDocFromAuth(user, displayName, 
        // {seller: true} 
      );
      resetFormFields();
      alert('User created successfully. Go to sign in!');
      navigate(path);
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
          <h4 className="title">Register</h4><hr/>
        </div>

        <form onSubmit={HandleSubmit}>
          <div className="group">
            <FormField
              label={'Display Name'}
              type='text' required
              onChange={handleChange}
              name='displayName'
              value={displayName}
            />

            <FormField
              label={'Email'}
              type='email' required
              onChange={handleChange}
              name='email'
              value={email}
            />
            
            <FormField
              label={'Password'}
              type='password' required
              onChange={handleChange}
              name='password'
              value={password}
              autoComplete='true'
            />

            <FormField
              label={'Confirm Password'}
              type='password' required
              onChange={handleChange}
              name='confirmPassword'
              value={confirmPassword}
              autoComplete='true'
            />

            <FormLabel
              className="lr-margin">
              <p>Are you here to Buy or Sell?</p>
            </FormLabel>

            {/* default value depends on user interaction */}
            <RadioGroup
              value={buyer ? 'buyer' : 'seller'}
              onChange={handleChange}
              className="lr-margin"
              name='userType'
            >
              <ol>
                <FormControlLabel onClick={handleChangeUser} value="buyer" control={<Radio />} label="Buyer" />
                <FormControlLabel onClick={handleChangeUser} value="seller" control={<Radio />} label="Seller" />
              </ol>
            </RadioGroup>
            
            <br/>
            <div className='buttons-container'>
              <Button type="submit">
                Sign Up
              </Button>
              <Button
                type='button'
                buttonType='google'
                onClick={logGoogleUser}
              >
                Google Sign-up
              </Button>
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