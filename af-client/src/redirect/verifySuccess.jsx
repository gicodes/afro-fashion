import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';

const VerificationSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

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
        imgSrc={"https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q"}
        imgAlt={"Verification successful media"}
      />
    </>
  );
};

export default VerificationSuccess;

