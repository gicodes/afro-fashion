import React, { useEffect, useState, useContext} from 'react';
import { useLoading } from '../../contexts/loading.context.tsx';
import { CartContext } from '../../contexts/cart.context.tsx';
import { StarOutlined } from '@mui/icons-material';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Product } from './product-card';
import { Button } from '@mui/material';
import './product-route.styles.scss';

export const SizeVariation: React.FC<{product: Product}> = ({product}) => {
  return (
    <div>Size Variations</div>
  )
}

const ProductInfo: React.FC<{product: Product}> = ({product}) => {
  const navigate = useNavigate()
  const { showLoading, hideLoading } = useLoading();
  const { addItemtoCart, removeItemfromCart, cartCount } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { name, price, info, count, category, imageUrls, seller } = product;

  const multipleImages = Array.isArray(imageUrls) && imageUrls.length > 1;
  let sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    if (multipleImages) {
      const nextImageIndex = (currentImageIndex + 1) % imageUrls.length;
      const prevImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
      
      const preloadImage = (url) => {
        const img = new Image();
        img.src = url;
      };

      preloadImage(imageUrls[nextImageIndex]);
      preloadImage(imageUrls[prevImageIndex]);
    }
  }, [currentImageIndex, imageUrls, multipleImages]);

  const productIn = () => addItemtoCart(product);

  const handleInstantPay = (e) => {
    e.preventDefault();
    productIn();
    showLoading();

    navigate('/checkout');
    hideLoading();
  }

  return (
    <div className='product-content-group'>
      <div className='img-container'>
        <img className='maxi-img' src={imageUrls[currentImageIndex]} alt={name} />
        { multipleImages && (
          <div 
            className='flex'
          >
            {imageUrls.map((url, index) => (
              <div
                onClick={() => setCurrentImageIndex(index)}
              >
                <img 
                  key={index}
                  src={url}
                  className='thumbnail' 
                  style={{
                    border: index === currentImageIndex ? '0.1px solid burlywood' : 'none'
                  }}
                  alt='mini-image-array'
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='info-container'>
        <h2>{name}</h2>
        <div className='flex text-grey mb-3'>
          <div id='rating'>
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
            <StarOutlined />
          </div>
          <span className='px-4 mt-2 text-ds1 fs-smaller'>No reviews</span>
        </div>
        <p className='fs-larger text-ds1 fw-l-bold'> ₦ {price} </p>
        <p className='product-info'>{info}</p>
        <hr/>

        <div className='flex-space-bet p-2'>
          <div>
            <div className='fs-mid my-3'>
              <span>Size: &nbsp;</span>
              <span>{sizes[0]}, {sizes[1]}, {sizes[2]}</span>
            </div>
            <div className='fs-mid my-3'>
              <span>Stock remaining: &nbsp;</span>
              <span className={count < 5 ? 'text-warn' : "text-success"}>{count}</span>
            </div>
          </div>
          <div>
            <div className='fs-mid my-3'>
              <span>Category: &nbsp;</span>
              <span className='text-ds2'>{category}</span>
            </div>
            <div className='fs-mid my-3'>
              <span>Seller: &nbsp;</span>
              <span className='text-ds1'>{seller}</span>
            </div>
          </div>
        </div>

        <div className='fullWidth flex-space-bet mt-5'>
          <Button 
            variant='outlined'
            color='inherit'
            onClick={() => removeItemfromCart(product)}
          >
            <FaMinus />
          </Button>
          <h6 className='v-center'>Add item to Cart ({cartCount})</h6>
          <Button 
            color='inherit'
            variant='contained'
            onClick={(productIn)}
          >
            <FaPlus />
          </Button>
        </div>
        
        <Button
          color='primary'
          variant='contained'
          className='fullWidth my-2 p-2'
          onClick={handleInstantPay}
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}

export default ProductInfo