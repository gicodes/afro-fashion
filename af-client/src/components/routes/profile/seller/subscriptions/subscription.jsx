import { Button } from 'react-bootstrap';
import ChoosAndPay from './chooseAndPay';
import SubscriptionTable from './subTable';
import { useState, useContext } from 'react';
import { UserContext } from '../../../../../contexts/user.context';

const Subscription = () => {
  const { currentUser } = useContext(UserContext);
  const [ subTable, setSubTable ] = useState(false);
  const [ chooseAndPay, setChooseAndPay ] = useState(false);

  const handleSubTable = () => setSubTable(!subTable);
  const handleSubscribe = () => setChooseAndPay(!chooseAndPay);

  const sub = currentUser?.subscription;
  const exp = sub?.UpdatedAt;

  return (
      <>
        <div className="card p-2 mb-2 vh-100">
          <div className="card-title">
            <h3 className="text-center mx-auto bg-ws p-3">Manage Subscriptions</h3>
          </div>

          <div className="card p-1 mt-1" id="subscription-table">
            <div className='m-1 p-2 mx-auto'>
              { sub === null ? (
                <p>You currently have no active subscription</p>
              ):(
                <p>You are currently on the {sub} subscription. Expires {exp}</p>
              )}
            </div>
            
            <Button variant='info' onClick={handleSubTable}>See Subscription Packages</Button>  
            <div className='m-2'>
              {subTable && <SubscriptionTable />}
            </div>
            
            <Button variant='primary' onClick={handleSubscribe}>Subscribe</Button>  
            <div className='mt-1'>
              {chooseAndPay && <ChoosAndPay />}
            </div>     
          </div>
        </div>
    </>
  );
};

export default Subscription;
