import { Button } from 'react-bootstrap';
import ChoosAndPay from './chooseAndPay';
import SubscriptionTable from './subTable';
import { useState, useContext } from 'react';
import { UserContext } from '../../../../../contexts/user.context';

import './sub.styles.scss';

const Subscription = () => {
  const { currentUser, userId } = useContext(UserContext);
  const [ subTable, setSubTable ] = useState(false);
  const [ chooseAndPay, setChooseAndPay ] = useState(false);

  const handleSubTable = () => setSubTable(!subTable);
  const handleSubscribe = () => setChooseAndPay(!chooseAndPay);

  const pending = currentUser?.latestSubAction;
  const exp = currentUser?.latestSubExpiry; 
  const sub = currentUser?.subscription; 

  return (
      <>
        <div className="subscription card p-2 mb-2">
          <div className="card-title">
            <h3 className="text-center mx-auto bg-ws p-3">Manage Subscriptions</h3>
          </div>

          <div className="card p-1 mt-1" id="subscription-table">
            {currentUser && <div className='m-1 p-2 mx-auto'>
              { sub === null ? (
                <p>You currently have no active subscription</p>
              ):(
                <p>You have {pending ? `a *${pending}* ` : "an active "} 
                {sub} subscription. {exp ? `Expires on: ${exp}` : "Status of payment is unavailable"}</p>
              )}
            </div>}
            
            <Button variant='info' onClick={handleSubTable}>See Subscription Packages</Button>  
            <div className='mb-2'>
              {subTable && <SubscriptionTable />}
            </div>
            
            <div className='col-md-8 mx-auto'><Button variant='primary' className='fullWidth' onClick={handleSubscribe}>Subscribe</Button>  
            {
              currentUser?.userType === "seller" && 
              <div className='mt-1'>
                {chooseAndPay && <ChoosAndPay uid={userId} />}
              </div>}
            </div>
          </div>
        </div>
    </>
  );
};

export default Subscription;