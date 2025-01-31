import './checkout.styles.scss';
import { Card } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckoutContent from './checkout';
import PaymentCard from './payment.card';
import { Button } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/user.context.tsx';
import { useAlert } from '../../contexts/alert.context.tsx';
import { CartContext } from '../../contexts/cart.context.tsx';

const Checkout: React.FC = () => {
  const { addAutoCloseAlert } = useAlert();
  const { cartItems } = useContext(CartContext);
  const { currentUser, uid } = useContext(UserContext);
  const [ payCard, setPayCard ] = useState<boolean>(false);

  const items = cartItems.map((item) => { return item });
  const { address, displayName, email, phone } = currentUser || {};

  const togglePayCard = () => {
    if (cartTotal === 0){
      addAutoCloseAlert("warning", 'Your cart is empty with nothing to pay for!')
      return;
    }
    if (!currentUser){
      addAutoCloseAlert("warning", 'You must be signed in to continue payments!')
      return;
    }
    currentUser && cartTotal > 0 ? setPayCard(true) : setPayCard(false);
  }

  const closePayCard = () => setPayCard(false);

  const cartTotal = cartItems.map(
    (item) => item.price * item.quantity).reduce((total, itemTotal) => total + itemTotal, 0
  )

  return (
    <div>
      <table className="card table table-hover table-light mt-1">
        <thead className='checkout-table'>
          <tr className='t-header'>
            <th scope="col" className="w-25">Item</th>
            <th scope="col" className="w-25">Title</th>
            <th scope="col" className="w-25">Quantity</th>
            <th scope="col" className="w-25">Price</th>
          </tr>
        </thead>

        <tbody className='checkout-table'>
          { cartItems.map((item) => 
            <CheckoutContent key={item.id} cartItem={item} />
          )} 
          <tr className='total'>
            <td className='sub-total fs-smaller'>
              <span>SUB/ TOTAL: &nbsp;</span> <h6> ₦{`${cartTotal}.00`}</h6>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='pay-gap'/>
      <div className='pay-button'>
        <div  onClick={togglePayCard} className='px-5 btn btn-info'>
          Continue to  pay
        </div>
      </div>
      <div className='pay-gap'/>

      { payCard && 
        <PaymentCard
          amount={cartTotal}
          email={email} 
          name={displayName} 
          items={items} // should include `item.category` and `item.seller` to enhance data mapping
          phone_number={phone}
          userId={uid}
          closePayCard={closePayCard} 
        />
      }

      <div className='px-1'>
        <Card className="mx-auto col-md-6">
          <div className='card-header'>
            <div className="p-3 flex-space-bet">
              <div className="px-3 my-2">
                <h6>Delivery Address</h6>
                <p className="card-text fs-smaller">
                <span className='fs-large text-success'>•</span> &nbsp; {address || "To receive items via delivery, update your address from your profile..."}
                </p>
              </div>
              <div className='v-center'>
                <Button className='btn btn-warning fullWidth'>
                  <Link to="/dashboard">Update Address</Link>
                </Button>
              </div>
            </div>

            <div className='card-body p-3'>
              { items.length > 0 && 
                <div className='checkout-items-card'>
                  <p className='font-uni'>Nice move! you are paying for... </p>
                  <div className='items-container'>
                    <div className='items-row'>
                      { items.map((item)=> (
                        <div key={item.id}>
                          <b>{item.quantity}</b> x
                          &nbsp;{item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </Card>
      </div>
      <div className='lg-div' />
    </div>
  )
}

export default Checkout;