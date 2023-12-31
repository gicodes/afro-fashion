/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import SignUpForm from '../sign-up/sign-up-page.jsx';
import SignInForm from './sign-in-page.jsx';

import './authentication.scss'

const MobileSignIn = () => {
  return (
    <>
      {/* br suits the temporary gap-design solution between the parent container and nav */}
      <br/>
        <div>
          <SignInForm />
        </div>

        {/* br suits the temporary gap-design solution between the sign-up and sign-in components */}
        <br/>
        <div>
          <SignUpForm />
        </div>
      <br/>
    </>
  )
}

export default MobileSignIn;