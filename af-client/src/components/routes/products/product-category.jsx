import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCategory = (product) => {
  const itemClass = (product_stock, product_price) => {
    if (product_stock < 5 && product_price > 50) {
      return "Limited"
    } 
    if (product_price > 80) {
      return "Exclusive"
    } else return ""
  }

  return (
    <>
      <div>
        <span className="font-awesome px-3 text-gray"> 
          <b>Category:</b>
        </span> 
        <Link 
          title='category link'  
          to={product?.category} 
          className='text-link'
        >
          {product?.category[0].toUpperCase() + product?.category.slice(1)}
        </Link>

        <span className='flex flex-end text-success font-classic px-2'>
          <b>{itemClass(product?.stock, product?.price)}</b>
        </span>

        <p className='mt-3 fs-small text-center'>
          More from &nbsp; 
            <Link 
              title='seller link'  
              to={product?.seller}
              className='text-link'
              >
              <u>{product.seller}</u>
            </Link></p>
      </div>
    </>
  )
}
