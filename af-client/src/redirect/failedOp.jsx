import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';

const FailedOperation = () => {
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
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <>
      <RedirectTemplate 
        title={"Transaction Failed!"}
        body={`Redirecting to the home page in ${countdown} seconds..`}
        imgSrc={"https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q"}
        imgAlt={"Transaction failed media"}
      />
    </>
  );
};

export default FailedOperation;
