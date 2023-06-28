import { useState } from "react";
import FormField from "./form.component";
import Button from "../../../buttons/button.component";
import {
  signInWithEmail,
  signInWithGoogle,
} from "../../../../utils/firebase.utils";
import { Container } from "react-bootstrap";

const defaultFormFields = {
  email: '',
  password: '',
}

const logGoogleUser = async () => await signInWithGoogle();


// Sign in with form takes email and password, or google credentials
const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const resetFormFields = () => { setFormFields(defaultFormFields) }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await signInWithEmail(email, password);
      resetFormFields();
    }
    catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          alert('Email or Password incorrect')
          break
        case 'auth/wrong-password':
          alert('Password incorrect')
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
      <div className="card container sign-in-container">
        <div className="card-header">
          <h3>Already have an account?</h3>
          <span>Sign in with your email and password</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="group">
            <FormField
              label={'Email'}
              type="email" required
              onChange={handleChange}
              name="email"
              value={email}
            />

            <FormField
              label={'Password'}
              type="password" required
              onChange={handleChange}
              name="password"
              autoComplete="true"
              value={password}
            />

            <div className='buttons-container container'>
              <Button type='submit'>
                Sign In
              </Button>

              <Button
                type='button'
                buttonType='google'
                onClick={logGoogleUser}
              >
               Google sign-in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default SignInForm;