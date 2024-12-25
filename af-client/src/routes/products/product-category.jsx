import { Link } from 'react-router-dom';
import './product-card.styles.scss';

export const ProductCategory = (product) => {
  const itemClass = (product_stock, product_price) => {
    if (product_stock < 5 && product_price > 50) {
      return "Limited"
    } 
    if (product_price > 80) {
      return "Exclusive"
    } else return ""
  }
  
  const category = product?.category;

  return (
    <>
      <div className='pc-product-category'>
        { category !== undefined && <>
          <span className="font-awesome px-3 text-gray"> 
            <b>Category:</b>
          </span> 
          <Link 
            className='text-link'
            title='category link'  
            to={category ? `/marketplace/category/${category}` : '#'}
            >
            {category[0].toUpperCase() + category.slice(1)}
          </Link>          
        </>}

        <span className='flex flex-end text-success font-classic px-2'>
          <b>{itemClass(product?.stock, product?.price)}</b>
        </span>

        {product?.seller && <p className='mt-2 fs-small text-center'>
          More from &nbsp; 
            <Link 
              className='text-link'
              title='seller link'  
              to={`/brands/${product?.seller}`}
            >
              {product?.seller}
            </Link>
          </p>}
      </div>
    </>
  );
};
