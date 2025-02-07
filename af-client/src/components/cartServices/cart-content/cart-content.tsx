import './cart-content.styles.scss';
import React, { useContext } from 'react';
import { DeleteSharp } from '@mui/icons-material';
import { CartContext } from '../../../contexts/cart.context';

interface CartContentProps {
  cartItem: {
    name: string;
    imageUrl: string;
    imageUrls: string;
    price: number;
    quantity: number;
  };
}

const CartContent: React.FC<CartContentProps> = ({ cartItem }) => {
  const { name, imageUrl, imageUrls, price, quantity } = cartItem;
  const { clearItemfromCart } = useContext(CartContext);

  return (
    <>
      <div className='cart-item-container'>
        <div className='cart-content-img'>
          <img 
            src={imageUrl || imageUrls}
            loading="lazy"
            alt={name}
          />
        </div>
        
        <div className='cart-content-span'>
          <span className='name'>{name}</span>
          <span className='price'>
            <strong>{quantity}</strong> x &nbsp; 
            <strong> ₦{price}</strong>
          </span>

          <div className='remove-btn' onClick={() => clearItemfromCart(cartItem)}>
            <DeleteSharp color='warning' fontSize='small'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartContent;