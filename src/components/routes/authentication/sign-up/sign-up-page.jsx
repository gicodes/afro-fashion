import { useState } from "react";
import Button from '../../../buttons/button.component'
import FormField from "./form.component";
import {
  createAuthUserWithEmailandPassword,
  createUserDocFromAuth,
  signInWithGoogle,
} from "../../../../utils/firebase.utils";

import './form-field.styles.scss';

import { RadioGroup, FormLabel, FormControlLabel, Radio } from "@mui/material";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const logGoogleUser = async () => await signInWithGoogle();

// SignUp takes a username and password, with multiple fields and functions
const SignUp = () => {

  const defaultFormFields = {
    displayName: '',
    email: '',
    seller: '',
    password: '',
    confirmPassword: '',
  }

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const resetFormFields = () => { setFormFields(defaultFormFields) };
  const navigate = useNavigate();
  let path = '/auth'; 

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

  const handleChange = (event) => {
    const { name, value, displayName, seller } = event.target;
    setFormFields({ ...formFields, [name]: value, [displayName]: value, [seller]: value });
  }

  return (
    <Container className=" no-padding-container">
      <div className="card container sign-up-container">
        <div className="card-header bg-gw">
          <h4>Don't have an account? </h4>
          <p className="fs-smaller">Sign up with your email and password</p>
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

            <FormLabel>
              <h6>Are you here to Buy or Sell?</h6>
            </FormLabel>
            <RadioGroup
              defaultValue='buyer'
              name='seller'
            >
              <FormControlLabel value="buyer" control={<Radio />} label="buyer" />
              {/* <FormControlLabel value="seller" control={<Radio />} label="seller" /> */}
              <br/>
            </RadioGroup>

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
      </div>
    </Container>
  )
}

export default SignUp;