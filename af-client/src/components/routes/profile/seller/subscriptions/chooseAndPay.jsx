import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetExchangeRate from '../../../../../utils/rate.utils';
import { useAlert } from '../../../../../contexts/alert.context';

const ChooseAndPay = () => {
  const navigate = useNavigate();
  const { addAutoCloseAlert } = useAlert();
  const [countdown, setCountdown] = useState(59);
  const [subscription, setSubscription] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      addAutoCloseAlert("warning", 'You did not complete the transaction within the specified time')
      navigate('/profile');
    }
  }, [countdown, navigate, addAutoCloseAlert]);

  const handleRadioChange = (event) => {
    setSubscription(event.target.value);
  };

  let todaysBMRate;
  todaysBMRate = GetExchangeRate() + 300 || 1600;

  let amount;
  let bank;

  switch (subscription) {
    case "basic":
      amount = todaysBMRate * 10;
      bank = "Wema 0239578114"
      break;
    case "business":
      amount = todaysBMRate * 25;
      bank = "Kuda 2045103742"
      break;
    case "premium":
      amount = todaysBMRate * 50;
      bank = "FirstBank 3080574360"
      break;
    default : 
  }

  return (
    <div className="card">
      <div className="card-body">

        <div className="form-check m-3">
          <input
            className="form-check-input fs-smaller m-2"
            type="radio"
            name="subscription"
            value="basic"
            checked={subscription === "basic"}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="basicSubscription">
            Basic Package
          </label>
        </div>

        <div className="form-check m-3">
          <input
            className="form-check-input fs-smaller m-2"
            type="radio"
            name="subscription"
            value="business"
            checked={subscription === "business"}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="businessSubscription">
            Business Package
          </label>
        </div>

        <div className="form-check m-3">
          <input
            className="form-check-input fs-smaller m-2"
            type="radio"
            name="subscription"
            value="premium"
            checked={subscription === "Premium"}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="premiumSubscription">
            Premium Package
          </label>
        </div>

        {subscription && ( 
          <div className='mt-3 p-1'>
            <p>Complete the following steps to activate your {subscription} subscription:</p>

            <li>Transfer <span className='fs-smaller'>NGN </span>{amount} to <u>{bank}</u> </li>
            <li>Do this within the next {countdown} minutes</li>
            <li>Send your payment receipt to <span className='m-4'><b>info@afrofashion.site</b></span></li>

            <span>
              <br/> Completed the Transaction? &nbsp;
              <Button variant='success' href='/profile'>Click here</Button>
            </span>  
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAndPay;
