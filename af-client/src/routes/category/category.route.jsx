import { CategoriesContext } from '../../contexts/categories.context';
import { useContext, useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import { useParams } from 'react-router-dom';
import { Paper } from '@mui/material';

import './category.styles.scss';

// category route is rendered when users click on a category from the index page
const Category = () => {
  const { category } = useParams(); 
  const { categoriesMap, categoriesInfo } = useContext(CategoriesContext);
  const [ products, setProducts ] = useState(categoriesMap[category]);
  const categoryInfo = categoriesInfo?.find((item) => item?.title === category?.toLowerCase().trim());

  useEffect(() => {
    setProducts(categoriesMap[category]);
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
        { !products?.length > 0 ? (
          <p className='text-center fs-mid'>
            Nothing on {category} right now. Try again later!
          </p>
        ) : (
        <div className={products?.length < 3 ? 'category-route-container-df' : `category-route-container-dg`}>
          { products && products.map((product) => (
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