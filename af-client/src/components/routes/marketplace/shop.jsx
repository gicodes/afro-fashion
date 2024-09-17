import ProductCard from '../products/product-card';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';

import './marketplace.styles.scss';

const Collections = () => {
  const [ allProducts, setAllProducts ] = useState([]);
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    let productsArray = [];
    Object.values(categoriesMap).forEach((products) => {
      productsArray = [...productsArray, ...products];
    });
    productsArray.sort(() => Math.random() - 0.5); // shuffle products randomly 
    setAllProducts(productsArray);
  }, [categoriesMap]);

  return (
    <>
      { allProducts?.length > 0 ? (
        <div className='marketplace-route'>
          { allProducts.map((product, index) => (
            <section 
              key={index} 
              id={product.id} 
              className='product-section'
            >
              <ProductCard 
                key={product?.id}
                product={product} 
              />
              <br/>
            </section>
          ))}
          <div className='hide-in-sm lg-div' />
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