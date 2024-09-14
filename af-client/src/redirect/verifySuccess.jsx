import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';
import { useEffect } from 'react';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // check if the link is a sign-in with email link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) email = window.prompt('Please provide your email for confirmation');

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn'); // clear email from storage
          navigate('/dashboard');
        })
        .catch((error) => console.error('Error signing in with email link:', error));
    }
  }, [navigate, auth]);

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