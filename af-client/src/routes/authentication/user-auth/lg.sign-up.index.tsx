/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import React from 'react';
import { Paper } from '@mui/material';
import SignUpForm from '../sign-up/sign-up-page.tsx';

import './authentication.scss'

const SignIn = () => {

  return (
    <>
      <div className='auth-container col-md-10'>
        <Paper elevation={8} className='auth-sign-up-form'>
          <SignUpForm />
        </Paper>
      </div>
      <div className='lg-div'></div>
    </>

  )
}

export default SignIn;