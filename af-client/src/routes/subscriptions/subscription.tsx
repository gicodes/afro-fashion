import './sub.styles.scss';
import { Button } from 'react-bootstrap';
import ChooseAndPay from './chooseAndPay.tsx';
import SubscriptionTable from './subTable.tsx';
import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/user.context.tsx';
import { formatADateToDMY } from '../../components/date/dateConverter.ts';

export const subPricesPerMonthinNaira = ["Free", '₦15,000', '₦38,000', '₦75,000'];

export const subPricesPlan = [{
  id: 1,
  name: "Free",
  price: 0,
  duration: "lifetime",
  description: "This is the free tier",
},
{
  id: 2,
  name: "Basic",
  price: 15000,
  annualPrice: 170000,
  description: "This is the basic package",
},
{
  id: 3,
  name: "Business",
  price: 38000,
  annualPrice: 420000,
  description: "This is the business package",
},
{
  id: 4,
  name: "Premium",
  price: 75000,
  annualPrice: 800000,
  description: "This is the premium package",
}];

const Subscription: React.FC = () => {
  const [showChooseAndPay, setShowChooseAndPay] = useState(false);
  const [showSubTable, setShowSubTable] = useState(false);
  const { currentUser, uid } = useContext(UserContext);

  const handleToggleSubTable = () => setShowSubTable((prev) => !prev);
  const handleToggleSubscribe = () => setShowChooseAndPay((prev) => !prev);

  const { latestSubAction: pending, latestSubExpiry: expires, subscription: subsOn } = currentUser || {};

  const seconds = expires?.seconds;
  const nanoseconds = expires?.nanoseconds;
  const totalMilliseconds = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(totalMilliseconds);
  const formattedDateOfExpiry = formatADateToDMY(date)

  return (
    <div className='card'>
      <div className="subscription container p-2 mb-2">
        <div className="card-title">
          <h3 className="text-center mx-auto bg-ws p-3">Manage Subscriptions</h3>
        </div>

        <div className="card p-1 mt-1" id="subscription-table">
          {currentUser && (
            <div className='m-1 p-2 text-center'>
              {subsOn ? (
                <p>
                  You have {pending ? `a *${pending}*` : "an active"} {subsOn} subscription.{' '}
                  {expires ? `Expires on: ${formattedDateOfExpiry}` : "Status of payment is unavailable"}
                </p>
              ) : (
                <p>You currently have no active subscription</p>
              )}
            </div>
          )}

          <Button className='col-md-6 mx-auto' variant='primary' onClick={handleToggleSubTable}>
            See Subscription Packages
          </Button>
          {showSubTable && <div className='mt-1 mb-2'><SubscriptionTable /></div>}
          <br/>

          <div className='col-md-7 mx-auto'>
            <Button variant='success' className='fullWidth' onClick={handleToggleSubscribe}>
              Subscribe Now
            </Button>
            {currentUser?.userType === "seller" && showChooseAndPay && (
              <div className='mt-1'>
                <ChooseAndPay userId={uid} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
