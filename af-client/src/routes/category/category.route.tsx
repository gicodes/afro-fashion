import { CategoriesContext } from '../../contexts/categories.context.tsx';
import React, { useContext, useState, useEffect, useMemo } from 'react';
import ProductCard from '../products/product-card.tsx';
import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';

import './category.styles.scss';

// category route is rendered when users click on a category from the index page
const Category = () => {
  const { category } = useParams<{ category: string | any }>(); 
  const categoriesContext = useContext(CategoriesContext);
  const categoriesMap = useMemo(() => categoriesContext?.categoriesMap || {}, [categoriesContext]);
  const categoriesInfo = categoriesContext?.categoriesInfo || [];
  const [ products, setProducts ] = useState<any[]>([]);
  const categoryInfo = categoriesInfo?.find((item) => item?.title === category?.toLowerCase().trim());

  useEffect(() => {
    if (category) {
      setProducts(Array.isArray(categoriesMap[category]) ? categoriesMap[category] : []);
    }
  }, [category, categoriesMap]);

  return (
    // section id issues a category with a dynamic link to target
    <section id={category}>
      <Paper className="category-route">
        <div>
          <h1 className='category-title'> 
            {category?.toUpperCase()}
          </h1>
          <hr className='w-25 mx-auto'/>
          <p className='p-3 text-center fs-smaller'>{categoryInfo?.description}</p>
        </div>
        { products.length === 0 ? (
          <p className='text-center fs-mid'>
            Nothing on {category} right now. Try again later!
          </p>
        ) : (
        <div className={products.length < 3 ? 'category-route-container-df' : 'category-route-container-dg'}>
          { products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
        )}
      </Paper>
    </section>
  )
}

export default Category;