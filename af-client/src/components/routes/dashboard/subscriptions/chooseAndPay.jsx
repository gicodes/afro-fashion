import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetExchangeRate from '../../../../utils/rate.utils';
import { updateSeller } from '../../../../utils/writeBatch';
import { useAlert } from '../../../../contexts/alert.context';

const ChooseAndPay = (userId) => {
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

  const handleRadioChange = (event) => {
    setSubscription(event.target.value);
  };

  const today = new Date();

  let todaysRate;
  let expiresAt;
  let amount;
  let bank;

  const format = 'MM/DD/YY'; // || 'DD/MM/YY' format

  if (format === 'MM/DD/YY') {
    expiresAt = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  } else if (format === 'DD/MM/YY') {
    expiresAt = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  }

  todaysRate = GetExchangeRate() + 300;
  if (todaysRate < 1000) {
    todaysRate = 1600;
  }

  switch (subscription) {
    case "basic":
      amount = todaysRate * 10;
      bank = "Wema 0239578114"
      break;
    case "business":
      amount = todaysRate * 25;
      bank = "Kuda 2045103742"
      break;
    case "premium":
      amount = todaysRate * 50;
      bank = "FirstBank 3080574360"
      break;
    default : 
  }

  const checkout = async (amount, subscription) => {
    const { uid } = userId;
    const emailSubject = `I have just paid ${amount.toFixed(2)} for ${subscription} subscription`;
    const emailLink = `mailto:info@afrofashion.site?subject=${encodeURIComponent(emailSubject)}`;

    await updateSeller(uid, 'subscription', subscription);
    await updateSeller(uid, 'latestSubExpiry', expiresAt);
    await updateSeller(uid, 'latestSubAction', "pending");

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
