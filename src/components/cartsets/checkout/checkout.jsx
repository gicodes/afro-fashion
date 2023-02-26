import { useContext } from 'react';
import { CartContext } from '../../../contexts/cart.context';


const CheckoutContent = ({ cartItem }) => {

  const { addItemtoCart, removeItemfromCart } = useContext(CartContext);

  const { imageUrl, name, quantity } = cartItem;
  const itemTotal = cartItem.price * cartItem.quantity;

  return (
    <div className='checkout-items-row'>
      <img
        src={imageUrl}
        alt={name}
      />
      <span className='item-name'>{name}</span>

      <div className='q-selector'>
        <span className='decrement' onClick={() => removeItemfromCart(cartItem)}>
          &#10094;
        </span>
        <span className='quantity'>{quantity}</span>
        <span className='increment' onClick={() => addItemtoCart(cartItem)}>
          &#10095;
        </span>
      </div>
      <span className='price'>${itemTotal}</span>
    </div>
  )
}

export default CheckoutContent;