/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './category.styles.scss';

import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card';
import { CategoriesContext } from '../../../contexts/categories.context';


// category route is rendered when users click on a category from the index page
const Category = () => {

  const { category } = useParams();

  const { categoriesMap } = useContext(CategoriesContext);

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <>
      <section id={category.toLowerCase()}>
        <Container className="card no-padding-container bg-dark">
          { !products ? (
            <>
              <hr className='-mt'/>
              <p className='mx-auto'>No items from {category} are available now. Try again later!</p>
            </>
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
          <h1 className='category-title'>
            <span className='mt-2 p-1 text-white'>
              {category.toUpperCase()}
            </span>
          </h1>
       </Container>
      </section>
    </>
  )
}

export default Category;