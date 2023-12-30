import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';
import { Container } from '@mui/material';

const CheckoutContent = ({ cartItem }) => {

  const { addItemtoCart, removeItemfromCart } = useContext(CartContext);

  const { imageUrl, name, quantity } = cartItem;
  const itemTotal = cartItem.price * cartItem.quantity;

  return (
    <Container className='card container'>
      
    <tr className='align-middle'>
      <td className='checkout-items-img'>
        <img
          src={imageUrl}
          alt={name}
        />
      </td>
      <td className='checkout-name'>{name}</td>
      <td className='checkout-items-row'>
        <span className='decrement' onClick={() => removeItemfromCart(cartItem)}>
          &#10094;
        </span>
        <span className='quantity'>{quantity}</span>
        <span className='increment' onClick={() => addItemtoCart(cartItem)}>
          &#10095;
        </span>
      </td>
      <td className='price'>${itemTotal}.00</td>
    </tr>
    </Container>
  )
}

export default CheckoutContent;