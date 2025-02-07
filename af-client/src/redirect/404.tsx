import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectTemplate } from './template.tsx';

const Page404 = () => {
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
        title={"Page Not Found!"}
        body={`Redirecting to the home page in ${countdown} seconds..`}
        imgSrc={"https://media.istockphoto.com/id/687810238/photo/pug-dog-with-yellow-constructor-safety-helmet-and-cone-and-404-error-and-dead-end-sign-on.jpg?s=612x612&w=0&k=20&c=DbvLxH_RhgH90S12YOBuYD2TDBLuiRC7SUy69Enm_g4="}
        imgAlt={"Page Not Found media"}
        children={null}
      />
    </>
  );
};

export default Page404;