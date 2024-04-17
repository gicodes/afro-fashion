import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template';

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
      <RedirectTemplate
        title={"Payment Successful!"}
        body={`Redirecting to the home page in ${countdown} seconds..`}
        imgSrc={"https://img.freepik.com/premium-photo/mobile-phone-transaction-payment-successful-screen-bank-credit-card-woman-hand-background_526934-75.jpg"}
        imgAlt={"Payment Successful media"}
      />
    </>
  );
};

export default PaymentSuccessful;
