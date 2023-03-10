import { useState } from "react";
import './form-field.styles.scss';
import Button from '../../../buttons/button.component'
import FormField from "./form.component";
import {
  createAuthUserWithEmailandPassword,
  createUserDocFromAuth,
  signInWithGoogle,
} from "../../../../utils/firebase.utils";

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
  const resetFormFields = () => { setFormFields(defaultFormFields) }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailandPassword(
        email, password
      );
      await createUserDocFromAuth(user, { displayName })
      resetFormFields();
    }
    catch (error) {
      if (error.message === 'auth/email-already-in-use') {
        alert('Error creating user. Email already in use')
      }
      alert('Something went wrong. Please try again...');
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account? </h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit}>
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

        <div className='buttons-container'>
          <Button type="submit">
            Sign Up
          </Button>

          <Button
            type='button'
            buttonType='google'
            onClick={logGoogleUser}
          >
            With Google
          </Button>
        </div>

      </form>
    </div>
  )
}

export default SignUp;