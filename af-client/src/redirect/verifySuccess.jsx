import { useNavigate, useParams } from 'react-router-dom';
import { RedirectTemplate } from './template';
import { useEffect, useState } from 'react';

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
        imgSrc={"https://media.istockphoto.com/id/1480674100/photo/3d-rendering-of-security-shield-check-mark-with-lock-sign.jpg?s=612x612&w=0&k=20&c=7UoO4gTNXSs83dAfCYnb3BlOOu38XDy9e_JUSLmQNoU="}
        imgAlt={"Verification successful media"}
      />
      <p className='hidden'>{verificationToken}</p>
    </>
  );
};

export default VerificationSuccess;

