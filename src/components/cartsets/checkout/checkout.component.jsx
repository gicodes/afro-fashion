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
      <table className="table table-light table-hover">
       <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map(
              (item) =>
                <CheckoutContent key={item.id} cartItem={item} />
            )
          } 
          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope='col'>
              SUB-TOTAL <hr/> 
              <h6>${`${cartTotal}`}.00</h6>
            </th>
          </tr>
        </tbody>
      </table>
  )
}

export default Checkout;