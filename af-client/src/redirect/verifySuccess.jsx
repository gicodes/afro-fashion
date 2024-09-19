import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useAlert } from "../contexts/alert.context";
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';
import { useEffect } from 'react';
import { sendVerification } from "../components/routes/authentication/seller-auth/verification";

const VerificationSuccess = () => {
  const { addAutoCloseAlert } = useAlert();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // check if the link is a sign-in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) email = window.prompt('Please provide your email for confirmation');

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          // window.localStorage.removeItem('emailForSignIn'); // clear email from storage
          navigate('/dashboard');
        })
        .catch(async (error) => {
          if (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code') {
            // If no email, re-prompt the user for his email
            let email = window.prompt('Please provide your email for confirmation');
            // The link is invalid or expired, prompt the user for a fresh link
            addAutoCloseAlert('warning', "Your sign-in link has expired. A new link will be sent to your email");
      
            await sendVerification(email)
          } else {
            console.error('Error signing in with email link:', error.message);
          }
        })
    }
  }, [navigate, auth, addAutoCloseAlert]);

  return (
    <>
      <RedirectTemplate 
        title={"Verification Successful!"}
        imgSrc={"https://media.istockphoto.com/id/1480674100/photo/3d-rendering-of-security-shield-check-mark-with-lock-sign.jpg?s=612x612&w=0&k=20&c=7UoO4gTNXSs83dAfCYnb3BlOOu38XDy9e_JUSLmQNoU="}
        imgAlt={"Verification successful media"}
      />
    </>
  );
};

export default VerificationSuccess;