/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import './cart-drop.styles.scss';
import { Link } from "react-router-dom";
import { CloseButton } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import Button from '../../buttons/button.component.tsx';
import CartContent from '../cart-content/cart-content.tsx';
import { CartContext } from '../../../contexts/cart.context.tsx';


const CartDropdown: React.FC = () => {
  const { cartItems, cartCount } = useContext(CartContext);
  const [ close, setClose ] = useState(false);

  const toggleCartClose = () => {
    if (close) return ;
    setClose(true);
  }

  return (
    <> 
    { close ? (
      <></>
      ) : (
      <div className='cart-drawer'>
        <div className='z-lg'>
          <span onClick={toggleCartClose} className='toggle-message'>
            <CloseButton/>
          </span>
          {
            cartCount === 0 ? (
              <span className='empty-message'>
                Your cart is empty
              </span>
              ) : (
              cartItems.map((item: any) => (
                <CartContent key={item.id} cartItem={item} />
              ))
            )
          }

          <Link 
            className='checkout-btn' 
            to='/checkout'>
            <Button buttonType="default">Checkout</Button>
          </Link>
        </div>
      </div>
    )}  
    </>
  )
}

export default CartDropdown;