/* This is a Mobile first Component. Designed to render on Mobile Devices */

import { Container } from 'react-bootstrap';
import SignUpForm from '../sign-up/sign-up-page.jsx';
import SignInForm from './sign-in-page.jsx';

const MobileSignIn = () => {
  return (
    <Container className="container">
        <div>
          <SignInForm />
        </div>
        <br/>
        <div>
          <SignUpForm />
        </div>
    </Container>
  )
}

export default MobileSignIn;