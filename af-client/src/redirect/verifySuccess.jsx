import { useEffect, useParams, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/auth');
    }
  }, [countdown, navigate]);

  return (
    <>
      <RedirectTemplate 
        title={"Verification Successful!"}
        body={`Redirecting to login in ${countdown} seconds..`}
        imgSrc={"https://media.istockphoto.com/id/1501391321/photo/user-authentication-system-login-success-symbol-password-cybersecurity.jpg?s=612x612&w=0&k=20&c=BJWDJuLyWxwbbi8d2Z0PLUPXtPP7A4MwUfQycmjVb2E="}
        imgAlt={"Verification successful media"}
      />
      <p className='hidden'>{verificationToken}</p>
    </>
  );
};

export default VerificationSuccess;

