/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import SignUpForm from '../sign-up/sign-up-page.jsx';

import './authentication.scss'

const MobileSignIn = () => {
  return (
    <>
      <div className='y-m lr-margin'>
        <SignUpForm />
      </div>
    </>
  )
}

export default MobileSignIn;