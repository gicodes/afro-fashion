import { useNavigate } from 'react-router-dom';
import { subPricesPlan } from './subscription.tsx';
import React, { useState, useEffect } from 'react';
import { updateSeller } from '../../utils/writeBatch.ts';
import { useAlert } from '../../contexts/alert.context.tsx';

interface ChooseAndPayProps {
  userId: string;
}

const ChooseAndPay: React.FC<ChooseAndPayProps> = ({ userId }) => {
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
      navigate('/dashboard');
    }
  }, [countdown, navigate, addAutoCloseAlert]);

  const handleRadioChange = (event) => setSubscription(event.target.value);

  const today = new Date();
  const prices = subPricesPlan.map((plan) => plan.price);

  let expiresAt;
  let amount;
  let bank;

  const format = 'MM/DD/YY'; // or 'DD/MM/YY' format
  if (format === 'MM/DD/YY') {
    expiresAt = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  } else if (format === 'DD/MM/YY') {
    expiresAt = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  }


  switch (subscription) {
    case "basic":
      amount = prices[1];
      bank = "Wema 0239578114" // bank account number 1 & 4
      break;
    case "business":
      amount = prices[2];
      bank = "Kuda 2045103742" // bank account number 2 & 5
      break;
    case "premium":
      amount = prices[3];
      bank = "FirstBank 3080574360" // bank account number 3
      break;
    default : 
  }

  const checkout = async (amount, subscription) => {
    const emailSubject = `I have just paid ${amount.toFixed(2)} for ${subscription} subscription`;
    const emailLink = `mailto:info@afrofashion.site?subject=${encodeURIComponent(emailSubject)}`;

    await updateSeller(userId, 'subscription', subscription);
    await updateSeller(userId, 'latestSubExpiry', expiresAt);
    await updateSeller(userId, 'latestSubAction', "pending");

    navigate('/subscriptions');
    window.location.href = emailLink;
  };

  return (
    <div className="subscription card">
      <div className="sub card-body">
        <div className='form-group'>
          <span className='block'>Choosing a subscription package </span>
          <span className='fs-smaller'>Will initiate a payment window valid for 1 hour</span>
        <div className="form-check mt-3">
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

        <div className="form-check mt-3">
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

        <div className="form-check mt-3 mb-3">
          <input
            className="form-check-input fs-smaller m-2"
            type="radio"
            name="subscription"
            value="premium"
            checked={subscription === "premium"}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="premiumSubscription">
            Premium Package
          </label>
        </div>
        </div>

        {subscription && ( 
          <div className='dropdown'>
            <p>Complete the following steps to activate your {subscription} subscription</p>

            <li>Send <span className='fs-smaller'>NGN </span>{amount.toFixed(2)} to <u>{bank}</u> </li>
            <li>Do this within the next {countdown} minutes</li>
            <li>Send your payment receipt to <b>info@afrofashion.site</b></li>

            <br/><span className='sub-checkout'>
              Completed transaction?
              <span className='btn' onClick={() => checkout(amount, subscription)}>Click here</span>
            </span>  
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAndPay;
