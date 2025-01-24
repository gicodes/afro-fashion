/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import './cart-drop.styles.scss';
import { CloseButton } from 'react-bootstrap';
import Button from '../../buttons/button.component.tsx';
import { Link, useLocation } from "react-router-dom";
import CartContent from '../cart-content/cart-content.tsx';
import { CartContext } from '../../../contexts/cart.context.tsx';
import React, { useContext, useEffect, useState } from 'react';


const CartDropdown: React.FC = () => {
  const { cartItems, cartCount } = useContext(CartContext);
  const [ close, setClose ] = useState(false);
  const location = useLocation();


  const toggleCartClose = () => {
    if (close) return ;
    setClose(true);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setClose(true);
    }, 9999);
  
    // clean up the timeout when the component unmounts or when a new route is clicked
    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const handleNavDropPostRouting = () => {
    // close the burger menu when a user clicks a link
    setClose(true);
  };

  return (
    <> 
    { close ? (
      <></>
      ) : (

    <div className='cart-dropdown'>
      <div className='cart-items'>
        <span onClick={toggleCartClose} className='toggle-message'>
          <CloseButton />
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
          onClick={handleNavDropPostRouting}
          className='checkout-btn mt-1'
          to='/checkout'>
          <Button buttonType="default">
            Checkout
          </Button>
        </Link>
      </div>
    </div>
    )}  
    </>
  )
}

export default CartDropdown;