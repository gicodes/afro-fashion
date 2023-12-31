import { useContext } from 'react';
import './product-card.styles.scss';

import Button from '../buttons/button.component';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const productIn = () => addItemtoCart(product)
  const { addItemtoCart } = useContext(CartContext)

  return (
    <>
      <div className='product-card-container'>
        <img src={imageUrl} alt={name} />

        <div className='footer'>
          <span className='name'>
            {name}
          </span>
          
          <span className='price'>
            ${price}
          </span>
        </div>
        
        <Button buttonType={'inverted'} onClick={productIn}>
          Add to Cart
        </Button>
      </div>
    </>
  )

}

export default ProductCard;