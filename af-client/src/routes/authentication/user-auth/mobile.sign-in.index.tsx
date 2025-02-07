/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import React from 'react';
import { Paper } from '@mui/material';
import SignInForm from '../sign-in/sign-in-page.tsx';

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