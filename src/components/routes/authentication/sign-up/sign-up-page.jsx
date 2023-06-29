import { useState } from "react";
import './form-field.styles.scss';
import Button from '../../../buttons/button.component'
import FormField from "./form.component";
import {
  createAuthUserWithEmailandPassword,
  createUserDocFromAuth,
  signInWithGoogle,
} from "../../../../utils/firebase.utils";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const logGoogleUser = async () => await signInWithGoogle();

// SignUp takes a username and password, with multiple fields and functions
const SignUp = () => {

  const defaultFormFields = {
    displayName: '',
    email: '',
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
      await createUserDocFromAuth(user, { displayName });
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
        default: console.log(error.message);
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <Container className="container">
      <div className="card container sign-up-container">
        <div className="card-header">
          <h3>Don't have an account? </h3>
          <span>Sign up with your email and password</span>
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

            <div className='buttons-container container'>
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