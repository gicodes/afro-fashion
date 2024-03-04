/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card';
import { CategoriesContext } from '../../../contexts/categories.context';

// collections mapped to shop route
const Collections = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  let hasProducts = false;

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];

        if (products && products.length > 0) {
          hasProducts = true;
          
          return (
              <section>
                <Container className='card no-padding-container bg-dark btm-col'>
                  <h2 className='title mx-auto y-p'>
                    <Link to={title}>
                      <span className='p-2 text-white'>
                        {title.toUpperCase()}
                      </span>
                    </Link>
                  </h2>
                  <div className='preview p-1'>
                  {
                    products
                      .filter((_, idx) => idx < 4)
                      .map((product, index) => (
                        <section key={index} id={product.id}>
                          <ProductCard 
                            key={index} product={product} 
                          />
                        </section>
                    ))}
                  </div>
                </Container>
              </section>  
          )
        }

        return null;
      })}

      {!hasProducts && (
        <div className="card container bg-ws">
          <p className='mx-auto m-4'>No product available now... Try again later</p>
        </div>
      )}
    </>
  );
}

export default Collections