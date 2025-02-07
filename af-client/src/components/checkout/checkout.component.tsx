import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context.tsx';
import { ChevronLeft, ChevronRight, DeleteSharp } from '@mui/icons-material';

export const setPrice = (price: string | any) => {
  const numericPrice = parseFloat(price);
  const roundedPrice = numericPrice.toFixed(2);
  return roundedPrice.includes('.') ? roundedPrice : `${roundedPrice}`;
};

const CheckoutContent = ({ cartItem }) => {
  const { addItemtoCart, removeItemfromCart, clearItemfromCart  } = useContext(CartContext);
  const { imageUrl, imageUrls, name, quantity, seller } = cartItem;
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
      <td className='w-25 fs-smaller'>
        {name}
        <p className='fs-xs mt-1 text-success'>By {seller}</p>
      </td>
      <td className='w-25'>
        <div className='checkout-qty my-1'>
          <span className='decrement' onClick={() => removeItemfromCart(cartItem)}>
            <ChevronLeft fontSize='inherit' />
          </span>
          <span className='quantity text-success'>{quantity}</span>
          <span className='increment' onClick={() => addItemtoCart(cartItem)}>
            <ChevronRight fontSize='inherit' />
          </span>
        </div>
        <div className='remove-btn'>
          <DeleteSharp color='warning' onClick={() => clearItemfromCart(cartItem)} />
        </div>
      </td>
      <td className='w-25'> ₦{itemTotal}</td>
    </tr>
)}

export default CheckoutContent;
