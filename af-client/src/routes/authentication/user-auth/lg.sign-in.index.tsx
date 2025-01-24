import React from 'react';
import './authentication.scss';
import { Paper } from '@mui/material';
import SignInForm from '../sign-in/sign-in-page.tsx';

/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */
const SignIn = () => {

  return (
    <div className='auth-container col-md-10'>
      <Paper elevation={8} className='auth-sign-in-form'>
        <SignInForm />
      </Paper>
    </div>

  )
}

export default SignIn;