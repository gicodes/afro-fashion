/* This is a Mobile first Component. Designed to render on Mobile Devices */

import SignUpForm from '../sign-up/sign-up-page.jsx';
import SignInForm from './sign-in-page.jsx';

import './authentication.scss'

const MobileSignIn = () => {
  return (
    <>
      <br/>
        <div className="margin-top-am">
          <SignInForm />
        </div>
        <br/>
        <div>
          <SignUpForm />
        </div>
      <br/>
    </>
  )
}

export default MobileSignIn;