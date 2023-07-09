/* This is a Desktop first Component. Designed to render on Desktop Devices */

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './category.styles.scss';

import { Container } from 'react-bootstrap';
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
    <Container className="container">
      <br/>
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
    </Container>
  )
}

export default Category;