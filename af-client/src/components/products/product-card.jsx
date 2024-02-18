import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPrice } from '../checkout/checkout';
import Button from '../buttons/button.component';
import { useAlert } from '../../contexts/alert.context';
import { addToSavedItems } from '../../utils/writeBatch';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/user.context';
import { useLoading } from '../../contexts/loading.context';

import { 
  BsCreditCard, 
  BsBookmarkStarFill
} from "react-icons/bs";

import { 
  FaCircleChevronRight, 
  FaCircleChevronLeft, 
  FaRegThumbsDown 
} from "react-icons/fa6";

import './product-card.styles.scss';

// productCard embodies the first creation of product card and is used throughout the marketplace
const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const { addAutoCloseAlert } = useAlert();
  const { userId } = useContext(UserContext);
  const { showLoading, hideLoading } = useLoading();
  const { addItemtoCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // destructuring may include seller if need be to include sellerName on productCard
  const { id, name, price, info, count, imageUrls } = product;

  const hasMultipleImages = (imageUrls) => Array.isArray(imageUrls) && imageUrls.length > 1;
  const multipleImages = hasMultipleImages(imageUrls);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
  };

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

  return (
    <section id={id}>
      <div className='card container product-card-container mb-1'>
        <div className='p-1'>
          <div className='image-container'>
            <img loading="lazy" src={Array.isArray(imageUrls) ? imageUrls[currentImageIndex] : imageUrls} alt={name} />
            {multipleImages && (
              <>
                <div className='chevron-left' onClick={prevImage}><FaCircleChevronLeft /></div>
                <div className='chevron-right' onClick={nextImage}><FaCircleChevronRight /></div>
              </>
            )}
          </div>

          <Button buttonType={'inverted'} onClick={productIn}>
            Add to Cart
          </Button>

          <div className='footer'>
            <div className='name-price'>
              <span className='product-name'>{name}</span>
              <span className='product-price'>${setPrice(price)}</span>
            </div>

            <div className='info-content'>
              <p>{info || "Description unavailable"}</p>
              <p><span className='stock'>Stock:</span> &nbsp; {count || "N/A"}</p>

              <br/>
              <div className='mt-2 flex-just-center'>
                <div className='btn btn-warning bg-trans footer-actions'>
                  <BsCreditCard onClick={handleInstantPay} fill='forestgreen'/> &nbsp;
                  &nbsp; <BsBookmarkStarFill onClick={handleSaveItem} fill='#909090'/> &nbsp;
                  &nbsp; <FaRegThumbsDown onClick={handleDislike} color='darkred' />
                </div>
              </div>
            </div>
          </div>
          <br/>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;