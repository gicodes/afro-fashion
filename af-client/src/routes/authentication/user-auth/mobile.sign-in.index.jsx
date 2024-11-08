/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Paper } from '@mui/material';
import SignInForm from '../sign-in/sign-in-page.jsx';

import './authentication.scss'

const MobileSignIn = () => {
  return (
    <>
      <Paper elevation={8} className='mt-1 lr-margin'>
        <SignInForm />
      </Paper>
    </>
  )
}

export default MobileSignIn;