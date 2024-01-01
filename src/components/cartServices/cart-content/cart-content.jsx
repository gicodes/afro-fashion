import './cart-content.styles.scss';

const CartContent = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  return (
    <>
      <div className='cart-item-container'>
        <img 
          src={imageUrl}
          alt={name}
        />
        <div className='item-details'>
          <span className='name'>{name}</span>
          <span className='price'>
            <strong>{quantity}</strong> of&nbsp; 
            <strong>${price}</strong>
          </span>
        </div>
      </div>
    </>
  )
}

export default CartContent;