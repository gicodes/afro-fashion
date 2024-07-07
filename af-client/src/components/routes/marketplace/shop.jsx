import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../products/product-card';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';
import './marketplace.styles.scss';

const Collections = () => {
  const location = useLocation();
  const hash = location.hash;
  const productId = hash.substring(1);
  const { categoriesMap } = useContext(CategoriesContext);
  const [allProducts, setAllProducts] = useState([]);
  const trim = (product_stock, product_price) => {
    if (product_stock < 5 && product_price > 50) {
      return "Limited"
    } 
    if (product_price > 80) {
      return "Exclusive"
    } else return ""
  }

  useEffect(() => {
    let productsArray = [];
    Object.values(categoriesMap).forEach((products) => {
      productsArray = [...productsArray, ...products];
    });
    // shuffle products array randomly-- can be disabled 
    productsArray.sort(() => Math.random() - 0.5);
    setAllProducts(productsArray);
  }, [categoriesMap]);

  return (
    <>
      { allProducts.length > 0 ? (
        <div className='marketplace-route'>
          { allProducts.map((product, index) => (
            <section key={index} id={product.id}>
              <ProductCard 
                product={product} 
                productId={productId} 
              />
              
              <div className='cp-card-footer'>
                <span className="font-awesome px-3 text-gray"> 
                  <b>Category:</b>
                </span> 
                <Link title='category link' to={product.category} className='text-link'>
                  {product.category[0].toUpperCase() + product.category.slice(1)}
                </Link>
                <span className='flex flex-end text-success font-classic px-2'>
                  <b>{trim(product.stock, product.price)}</b>
                </span>
              </div>
              <div className='hide-in-sm lg-div'/>
            </section>
          ))}
        </div>
      ) : (
        <div className='card container p-2 bg-ws vh-100'>
          <hr className='-mt' />
          <p className='mx-auto fs-large'>
            No product available now... Try again later
          </p>
        </div>
      )}
    </>
  );
};

export default Collections;
