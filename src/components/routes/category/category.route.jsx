import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './category.styles.scss';

import ProductCard from '../../products/product-card';
import { CategoriesContext } from '../../../contexts/categories.context';

const Category = () => {

  const { category } = useParams();

  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <h1 className='category-title'>
        {category.toUpperCase()}
      </h1>
      <div className='category-route-container'>
        {
          products && products.map(
            (product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </>
  )
}

export default Category;