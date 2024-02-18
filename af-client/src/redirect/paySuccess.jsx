import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccessful = () => {
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
            <h2 className="mx-auto bg-ws p-2">Payment Successful!</h2>
          </div>
          <div className="mt-5">     
            <img loading="lazy" 
              alt="Payment Successful media"
              className="mt-5 lg-fullWidth" 
              src="https://img.freepik.com/premium-photo/mobile-phone-transaction-payment-successful-screen-bank-credit-card-woman-hand-background_526934-75.jpg"
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

export default PaymentSuccessful;
