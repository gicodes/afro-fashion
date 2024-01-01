/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './category.styles.scss';

import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card';
import { CategoriesContext } from '../../../contexts/categories.context';


// category route serves the index or "shop now" click from home
const Category = () => {

  const { category } = useParams();

  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <section id={category.toLowerCase()} className='y-m lr-margin'>
      <Container className="card bg-ws lr-padding">
        <h1 className='category-title y-p'>
          {category.toUpperCase()}
        </h1>

        { !products ? (
          <p className='mx-auto'>No {category} items are available at the moment...</p>

        ) : (
        <div>
          {
            products && products.map(
            (product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        )}
      </Container>
      </section>
    </>
  )
}

export default Category;