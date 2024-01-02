/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import SignInForm from '../sign-in/sign-in-page.jsx';

import './authentication.scss'

const MobileSignIn = () => {
  return (
    <>
      <div className='y-m lr-margin'>
        <SignInForm />
      </div>
    </>
  )
}

export default MobileSignIn;