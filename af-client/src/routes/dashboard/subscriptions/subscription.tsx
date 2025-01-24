import React from 'react';
import { Button } from 'react-bootstrap';
import ChoosAndPay from './chooseAndPay.tsx';
import SubscriptionTable from './subTable.tsx';
import { useState, useContext } from 'react';
import { UserContext } from '../../../contexts/user.context.tsx';

import './sub.styles.scss';

const Subscription = () => {
  const [ chooseAndPay, setChooseAndPay ] = useState(false);
  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.userId || currentUser?.id;
  const [ subTable, setSubTable ] = useState(false);

  const handleSubTable = () => setSubTable(!subTable);
  const handleSubscribe = () => setChooseAndPay(!chooseAndPay);

  const pending = currentUser?.latestSubAction;
  const expires = currentUser?.latestSubExpiry; 
  const subsOn = currentUser?.subscription; 

  // create a date format to display expiry date
  const formatDate = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const seconds = expires?.seconds;
  const nanoseconds = expires?.nanoseconds;
 
  // convert seconds to milliseconds
  const milliseconds = seconds * 1000;
  // convert nanoseconds to milliseconds and add to the previous value
  const additionalMilliseconds = nanoseconds / 1e6;
  const totalMilliseconds = milliseconds + additionalMilliseconds;

  // create a Date object
  const date = new Date(totalMilliseconds);

  // format the date as YYYY-MM-DD
  const formattedDate = formatDate(date);
  
  return (
      <>
        <div className="subscription card p-2 mb-2">
          <div className="card-title">
            <h3 className="text-center mx-auto bg-ws p-3">Manage Subscriptions</h3>
          </div>

          <div className="card p-1 mt-1" id="subscription-table">
            {currentUser && 
              <div className='m-1 p-2 text-center'>
                { subsOn === null ? (<p>You currently have no active subscription</p>)
                :(
                  <p>You have {pending ? `a *${pending}* ` : "an active "} {subsOn} subscription. {expires ? `Expires on: ${formattedDate}` 
                  : "Status of payment is unavailable"}</p>
                )}
              </div>
            }
            <br/>
            
            <Button className='col-md-7 mx-auto' variant='info' onClick={handleSubTable}>
              See Subscription Packages
            </Button>  
            <div className='mt-1 mb-2'>
              {subTable && <SubscriptionTable />}
            </div>
            
            <div className='col-md-7 mx-auto'>
              <Button variant='primary' className='fullWidth' onClick={handleSubscribe}>
                Subscribe Now
              </Button>  
              {
                currentUser?.userType === "seller" && 
                <div className='mt-1'>
                  {chooseAndPay && <ChoosAndPay uid={userId} />}
                </div>
              }
            </div>
          </div>
        </div>
    </>
  );
};

export default Subscription;