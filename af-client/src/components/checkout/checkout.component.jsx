import { setPrice } from './checkout';
import { Link } from 'react-router-dom';
import CheckoutContent from './checkout';
import PaymentCard from './payment.card';
import { useContext, useState } from 'react';
import { Card, Button, } from 'react-bootstrap';
import { useAlert } from '../../contexts/alert.context';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';

import './checkout.styles.scss';

const Checkout = () => {
  const { addAutoCloseAlert } = useAlert();
  const { cartItems } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);
  const [ payCard, setPayCard ] = useState(false);

  const items = cartItems.map((item) => { return item })
  
  const { address, displayName, email, phone, userId } = currentUser || {};

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

  const closePayCard = () => {
    setPayCard(false);
  }

  const cartTotal = cartItems.map(
    (item) => item.price * item.quantity).reduce((total, itemTotal) => total + itemTotal, 0
  )

  const cartTotalinNaira = setPrice(cartTotal * 1500); // subject to change

  return (
    <>
      <table className="card table table-hover table-light mt-1">
        <thead className='checkout-table'>
          <tr className='t-header'>
            <th scope="col" className="w-25">Item</th>
            <th scope="col" className="w-25">Title</th>
            <th scope="col" className="w-25">Price</th>
            <th scope="col" className="w-25">Quantity</th>
          </tr>
        </thead>

        <tbody className='checkout-table'>
          {
            cartItems.map(
              (item) => <CheckoutContent key={item.id} cartItem={item} />
            )
          } 
          <tr className='total v-center'>
            <td className='sub-total fs-smaller'>
              SUB-TOTAL: &nbsp; <h6>${`${cartTotal}.00`}&nbsp;</h6>
            </td>
          </tr>
        </tbody>
      </table>

      <div className='pay-button -mt2'>
        <div  onClick={togglePayCard} className='p-3 btn btn-info'>
          Pay NGN {cartTotalinNaira}
        </div>
      </div>
      <div className='pay-gap'></div>

      { payCard && 
        <PaymentCard
          amount={cartTotalinNaira}
          email={email} 
          name={displayName} 
          items={items} // should include `item.category` and `item.seller` to enhance data mapping
          phone_number={phone}
          userId={userId}
          closePayCard={closePayCard} 
        />
      }

      <Card className="mb-3 mx-3 bg-ws lr-lg">
        <Card.Body>
          <div className="flex-space-bet">
            <div className="mb-3 mb-md-0">
              <h5 className="card-title">Delivery Address</h5>
              <p className="card-text fs-smaller">
               <span className='fs-large text-success'>•</span> &nbsp; {address || "To receive items via delivery, update your address from your profile..."}
              </p>
            </div>
            <div className='v-center'>
              <Button className='btn btn-success fullWidth'>
                <Link to="/dashboard" className='text-warning'>Update Address</Link>
              </Button>
            </div>
          </div>
          {
            items.length > 0 && <div className='card container items-card pb-3'>
              <h6 className='card-title mx-auto text-secondary'>Nice move! you are paying for...</h6>
                <div className='items-container pb-2'>
                <div className='items-row'>
              { items.map((item)=> (
                  <div key={item.id}>
                    <b>{item.quantity}</b>&nbsp;{item.name}
                  </div>
              ))}
                </div></div>
            </div>
          }
        </Card.Body>
      </Card>
      <div className='lg-div'></div>
    </>
  )
}

export default Checkout;