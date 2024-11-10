import { sendVerification } from "../routes/authentication/seller-auth/verification";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { sendVerificationSuccessEmail } from "../api/emailing/sevse";
import { useAlert } from "../contexts/alert.context";
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';
import { useEffect, useState } from 'react';

const VerificationSuccess = () => {
  const [imgMsg, setImgMsg] = useState("https://media.istockphoto.com/id/1258039119/photo/no-stopping-sign-on-asphalt.jpg?s=612x612&w=0&k=20&c=9UaXZd-FiIuPdXOtstsWGsKopiMSksCNOmQ-J4swhbM=");
  const { addAutoCloseAlert } = useAlert();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const handleSignIn = async () => {
      if (!isSignInWithEmailLink(auth, window.location.href)) {
        handleInvalidLink();
        return;
      }

      let email = window.localStorage.getItem('emailForSignIn') || window.prompt('Please provide your email for confirmation');
      if (!email) return;

      try {
        await signInWithEmailLink(auth, email, window.location.href);
        window.localStorage.removeItem('emailForSignIn'); // Clear storage after successful sign-in
        await sendVerificationSuccessEmail(email);

        setImgMsg("https://media.istockphoto.com/id/1480674100/photo/3d-rendering-of-security-shield-check-mark-with-lock-sign.jpg?s=612x612&w=0&k=20&c=7UoO4gTNXSs83dAfCYnb3BlOOu38XDy9e_JUSLmQNoU=");
        addAutoCloseAlert('success', 'Verification successful! Redirecting to your dashboard...');
        setTimeout(() => navigate('/dashboard'), 6000);
      } catch (error) {
        handleError(error, email);
      }
    };

    const handleInvalidLink = () => {
      addAutoCloseAlert('warning', 'The verification link is invalid or expired. Please enter your email to receive a new link.');
      setTimeout(async () => {
        const email = window.prompt('Enter your email to receive a new verification link:');
        if (email) await sendVerification(email);
      }, 5000);
    };

    const handleError = async (error, email) => {
      console.error('Error signing in with email link:', error.message);
      if (error.code === 'auth/invalid-action-code' || error.code === 'auth/expired-action-code') {
        addAutoCloseAlert('warning', 'Your sign-in link has expired. A new link will be sent to your email.');
        await sendVerification(email);
      } else {
        addAutoCloseAlert('error', 'An unexpected error occurred. Please try again later.');
      }
    };

    handleSignIn();
  }, [navigate, auth, addAutoCloseAlert]);

  return (
    <RedirectTemplate 
      title={"Verification in Progress..."}
      imgSrc={imgMsg}
      imgAlt={"Verification process in progress"}
    />
  );
};

export default VerificationSuccess;
