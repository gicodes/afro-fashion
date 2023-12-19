/* This is a Desktop first Component. Designed to render on Desktop Devices */

import SignUpForm from '../sign-up/sign-up-page.jsx';
import SignInForm from './sign-in-page.jsx';
import './authentication.scss'

const SignIn = () => {

  return (
    <div className='auth-container'>

      <div>
        <SignInForm />
      </div>


      <div>
        <SignUpForm />
      </div>

    </div>

  )
}

export default SignIn;