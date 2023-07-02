/* This is a Mobile first Component. Designed to render on Mobile Devices */

import SignUpForm from '../sign-up/sign-up-page.jsx';
import SignInForm from './sign-in-page.jsx';

const MobileSignIn = () => {
  return (
    <>
        <div>
          <SignInForm />
        </div>
        <br/>
        <div>
          <SignUpForm />
        </div>
    </>
  )
}

export default MobileSignIn;