import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FcLike, FcDislike } from "react-icons/fc";
import { setPrice } from '../../checkout/checkout';
import Button from '../../buttons/button.component';
import { ProductCategory } from './product-category';
import { useAlert } from '../../../contexts/alert.context';
import { addToSavedItems } from '../../../utils/writeBatch';
import { CartContext } from '../../../contexts/cart.context';
import { UserContext } from '../../../contexts/user.context';
import { useLoading } from '../../../contexts/loading.context';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { FaCircleChevronRight, FaCircleChevronLeft, FaAmazonPay } from "react-icons/fa6";

import './product-card.styles.scss';

// productCard embodies the first creation of product card and is used throughout the marketplace
const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addAutoCloseAlert } = useAlert();
  const { userId } = useContext(UserContext);
  const { showLoading, hideLoading } = useLoading();
  const { addItemtoCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { id, name, price, info, count, imageUrls, } = product;

  const multipleImages = Array.isArray(imageUrls) && imageUrls.length > 1;

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

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls?.length);
  }, [imageUrls?.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls?.length) % imageUrls?.length);
  }, [imageUrls?.length]);

  const productIn = () => addItemtoCart(product);

  const handleInstantPay = (e) => {
    e.preventDefault();
    productIn();
    showLoading();

    navigate('/checkout');
    hideLoading();
  }

  const handleDislike = () => addAutoCloseAlert("danger", `We'll try to show you less of this content`)

  const handleSaveItem = () => {
    let imageUrl;
    if(imageUrls.length > 1){
      imageUrl = imageUrls[0];
    } else imageUrl = imageUrls;
    
    const itemToAdd = {name, price, id, imageUrl};

    addToSavedItems(userId, itemToAdd, "savedItems")
    .then(() => {
      addAutoCloseAlert("success", 'Item saved successfully!');
    })
    .catch((error) => {
      addAutoCloseAlert("warning", 'Operation failed! Your account is not a verified Buyer');
    });
  }

  // Memoized Chevron components to avoid unnecessary re-renders
  const ChevronLeft = React.memo(() => (
    <div className='chevron-left' onClick={prevImage}>
      <FaCircleChevronLeft />
    </div>
  ));

  const ChevronRight = React.memo(() => (
    <div className='chevron-right' onClick={nextImage}>
      <FaCircleChevronRight />
    </div>
  ));

  return (
    <section id={id}>
      <Card 
        id={id}
        className='product-card-container'
        >
        <div className='p-2'>
          <div className='image-container'>
            <img   
              alt={name}
              loading="lazy"
              src={Array.isArray(imageUrls) ? imageUrls[currentImageIndex] : imageUrls} 
            />
            { multipleImages && (
              <>
                <ChevronLeft />
                <ChevronRight />
              </>
            )}
            <Button buttonType={'inverted'} onClick={productIn}>
              Add to Cart
            </Button>
          </div>

          <div className='card-body'>
            <div className='name-price'>
              <span className='product-name'> {name} </span>
              <span className='product-price'> ${setPrice(price)} </span>
            </div>
            <div className='info-content'>
              <div className='description'>
                <span>{info || "Description unavailable"}</span>
              </div>
              <div className='flex-space-bet m-2'>
                <span className='stock'> Stock: {count || "N/A"} </span>
                <span>{ProductCategory(product)}</span>
              </div>
              <div className='mt-5 p-3 card'>
                <div className='footer-actions flex-space-bet'>
                  <FcLike onClick={handleSaveItem} size={25} />
                  <FaAmazonPay onClick={handleInstantPay} size={28} fill='forestgreen'/>
                  <FcDislike onClick={handleDislike} size={25}/>
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>
      </Card>
    </section>
  );
};

export default ProductCard;