/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import SignInForm from '../sign-in/sign-in-page.jsx';

import './authentication.scss'

const SignIn = () => {

  return (
    <div className='auth-container col-md-10'>
      <div className='card auth-sign-in-form'>
        <SignInForm />
      </div>
    </div>

  )
}

export default SignIn;