/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes 
   This component can be modified or made redudant as it only entends a viewport for the sign-up page
*/

import { Paper } from '@mui/material';
import SignUpForm from '../sign-up/sign-up-page.jsx';

import './authentication.scss'

const MobileSignUp = () => {
  return (
    <>
      <Paper elevation={8} className='mt-1 lr-margin'>
        <SignUpForm />
      </Paper>
    </>
  )
}

export default MobileSignUp;