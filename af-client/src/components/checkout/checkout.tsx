import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context.tsx';

export const setPrice = (price: string | any) => {
  const numericPrice = parseFloat(price);
  const roundedPrice = numericPrice.toFixed(2);
  return roundedPrice.includes('.') ? roundedPrice : `${roundedPrice}`;
};

const CheckoutContent = ({ cartItem }) => {
  const { addItemtoCart, removeItemfromCart } = useContext(CartContext);
  const { imageUrl, imageUrls, name, quantity } = cartItem;
  const itemTotal = cartItem.price * cartItem.quantity;

  return (
  <tr className='align-middle'>
    <td className='w-25'>
      <img 
        src={imageUrl || imageUrls}
        className='checkout-img'
        loading="lazy"
        alt={name}
      />
    </td>
    <td className='w-25 fs-smaller'>{name}</td>
    <td className='w-25 checkout-qty'>
      <span className='decrement' onClick={() => removeItemfromCart(cartItem)}>
        &#10094;
      </span>
      <span className='quantity'>{quantity}</span>
      <span className='increment' onClick={() => addItemtoCart(cartItem)}>
        &#10095;
      </span>
    </td>
    <td className='w-25'>${itemTotal}</td>
  </tr>
)}

export default CheckoutContent;
