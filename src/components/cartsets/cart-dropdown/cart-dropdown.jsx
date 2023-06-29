import './cart-drop.styles.scss';
import { useContext } from 'react';
import { Link } from "react-router-dom";

import Button from '../../buttons/button.component';
import CartContent from '../cart-content/cart-content';
import { CartContext } from '../../../contexts/cart.context';

const CartDropdown = () => {

  const { cartItems, cartCount } = useContext(CartContext);

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        <span className='toggle-message'>
          click on the cart icon above to close this cart dropdown
          <hr/>
        </span>
        {
          cartCount === 0 ? (
            <span className='empty-message'>
              Your cart is empty
            </span>
          ) :
            (
              cartItems.map((item) => (
                <CartContent key={item.id} cartItem={item} />
              ))
            )}

        <Link className='cart-link'
          to='/checkout'>
          <Button>
            GO TO CHECKOUT
          </Button>
        </Link>
      </div>
    </div >
  )
}

export default CartDropdown;