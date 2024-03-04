import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className="card p-2 mb-2 vh-100">
        <div className="mx-auto text-center">
          <div className="card-title mt-5">
            <h2 className="mx-auto bg-ws p-2">Transaction Failed!</h2>
          </div>
          <div className="mt-5">     
            <img loading="lazy" 
              alt="Transaction failed media"
              className="mt-5 fullWidth" 
              src="https://media.licdn.com/dms/image/C5112AQGiR7AdalYNjg/article-cover_image-shrink_600_2000/0/1582176281444?e=2147483647&v=beta&t=QVzBFLJpbDlQMX_H5iKXr7Jr1w6Pm60tOJb47rjpX6Q"
            /> 
          </div>
          <div className="lg-div"></div>
          <div className="mt-3 p-3">
            <span>Redirecting to the home page in {countdown} seconds...</span>
          </div>
        </div>  
      </div>
    </>
  );
};

export default FailedOperation;
