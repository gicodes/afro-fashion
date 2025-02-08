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
        <div className='cart-container'>
          <span onClick={toggleCartClose} className='toggle-close-cart'>
            <span className='close-btn'>
              <CloseButton />
            </span>
          </span>
          {
            cartCount === 0 ? (
              <span className='empty-message'>
                Your cart is empty!
              </span>
            ) : (
              <div className='cart-items'>
                { cartItems.map((item: any) => (
                  <CartContent key={item.id} cartItem={item} />
                ))}
              </div>
            )
          }

          <Link 
            className='checkout-btn mt-4' 
            to='/checkout'
          >
            <Button buttonType="default">Checkout</Button>
          </Link>
        </div>
      </div>
    )}  
    </>
  )
}

export default CartDropdown;