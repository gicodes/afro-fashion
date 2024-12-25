import './marketplace.styles.scss';

import FilterWidget from './index.widget';
import ProductCard from '../products/product-card';
import { useContext, useEffect, useState } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

const sortByPricesHighToLow = (products) => {
  return [...products].sort((a, b) => a.price - b.price);
};

const sortByPricesLowToHigh = (products) => {
  return [...products].sort((a, b) => b.price - a.price);
};

const sortByPopularity = (products) => {
  return [...products].sort((a, b) => b.popularity - a.popularity); // Assuming 'popularity' is a numerical property
};

const sortByNewest = (products) => {
  return [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Assuming 'dateAdded' is in a date string format
};

// AF Marketplace is rendered in collections... 
const Collections = () => {
  const [filter, setFilter] = useState("Random");
  const [ allProducts, setAllProducts ] = useState([]);
  const { categoriesMap } = useContext(CategoriesContext);

  useEffect(() => {
    let productsArray = [];
    Object.values(categoriesMap).forEach((products) => {
      productsArray = [...productsArray, ...products];
    });

    switch (filter) {
      case "Price: Low to High":
        productsArray = sortByPricesHighToLow(productsArray);
        break;
      case "Price: High to Low":
        productsArray = sortByPricesLowToHigh(productsArray);
        break;
      case "Popularity":
        productsArray = sortByPopularity(productsArray);
        break;
      case "Newest":
        productsArray = sortByNewest(productsArray);
        break;
      default:
        productsArray.sort(() => Math.random() - 0.5); // Random shuffle
    }

    setAllProducts(productsArray);
  }, [categoriesMap, filter]);

  return (
    <>
      <FilterWidget setFilter={setFilter}/>
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
              /><br/>
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
      <div className='hide-in-sm lg-div' />
    </>
  );
};

export default Collections;