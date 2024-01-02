/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import SignUpForm from '../sign-up/sign-up-page.jsx';

import './authentication.scss'

const SignIn = () => {

  return (
    <div className='auth-container'>
      <div className='card auth-sign-up-form'>
        <SignUpForm />
      </div>

    </div>

  )
}

export default SignIn;