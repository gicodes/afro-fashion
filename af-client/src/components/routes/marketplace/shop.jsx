import { useLocation } from 'react-router-dom';
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

  useEffect(() => {
    let productsArray = [];
    Object.values(categoriesMap).forEach((products) => {
      productsArray = [...productsArray, ...products];
    });
    // shuffle products randomly-- runs on latest design 
    productsArray.sort(() => Math.random() - 0.5);
    setAllProducts(productsArray);
  }, [categoriesMap]);

  return (
    <>
      { allProducts?.length > 0 ? (
        <div className='marketplace-route'>
          { allProducts.map((product, index) => (
            <section key={index} id={product.id} className='product-section'>
              <ProductCard 
                product={product} 
                productId={productId} 
              />
            </section>
          ))}
        </div>
      ) : (
        <div className='card p-2'>
          <p className='fs-mid mt-3 text-center'>
            Products are unavailable... Try again later
          </p>
        </div>
      )}
    </>
  );
};

export default Collections;
