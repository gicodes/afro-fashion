import { sendVerification } from "../components/routes/authentication/seller-auth/verification";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { sendCongratulatoryEmail } from "../api/emailing";
import { useAlert } from "../contexts/alert.context";
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';
import { useEffect } from 'react';

const VerificationSuccess = () => {
  const { addAutoCloseAlert } = useAlert();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const handleSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) email = window.prompt('Please provide your email for confirmation');

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          
          // Send a congratulatory email
          await sendCongratulatoryEmail(email);

          // Redirect to dashboard after 10 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 10000); // 10 seconds delay

          addAutoCloseAlert('success', 'Verification successful! Redirecting to your dashboard in 10 seconds...');
        } catch (error) {
          if (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code') {
            let email = window.prompt('Please provide your email for confirmation');
            addAutoCloseAlert('warning', "Your sign-in link has expired. A new link will be sent to your email");

            await sendVerification(email);
          } else {
            console.error('Error signing in with email link:', error.message);
          }
        }
      }
    };

    handleSignIn();
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
