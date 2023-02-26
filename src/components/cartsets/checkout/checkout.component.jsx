import './checkout.styles.scss';
import { useContext } from 'react';

import CheckoutContent from './checkout';
import { CartContext } from '../../../contexts/cart.context';


const Checkout = () => {

  const { cartItems } = useContext(CartContext);

  // >> calculating checkout total 
  // >>> itemTotal = price * quantity
  // >>>> return cartTotal = itemTotal ++

  const cartTotal = cartItems.map(
    (item) => item.price * item.quantity).reduce(
      (total, itemTotal) => total + itemTotal, 0)

  return (
    <div className="checkout-container">
      <ul className='description-row'>
        <span>Item(s)</span>
        <span>Item Name</span>
        <span>Item Quantity</span>
        <span>Item Price</span>
      </ul>
      <hr />
      <span>
        {
          cartItems.map(
            (item) =>
              <CheckoutContent key={item.id} cartItem={item} />
          )}
      </span>

      <span className='checkout-total'>
        TOTAL: ${`${cartTotal}`}</span>
    </div>
  )
}

export default Checkout;