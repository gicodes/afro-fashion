/* This is a Desktop first Component. Designed to render on Desktop Devices */

import SignUpForm from '../sign-up/sign-up-page.jsx';
import SignInForm from './sign-in-page.jsx';
import './authentication.scss'
import { Card } from 'react-bootstrap';

const SignIn = () => {

  return (
    <div className='auth-container'>

      <Card className='auth-sign-in-form'>
        <SignInForm />
      </Card>


      <Card className='auth-sign-up-form'>
        <SignUpForm />
      </Card>

    </div>

  )
}

export default SignIn;