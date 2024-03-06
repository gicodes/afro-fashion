import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../products/product-card';
import { useContext } from 'react';
import { CategoriesContext } from '../../../contexts/categories.context';

import './marketplace.styles.scss';

// collections mapped to shop route
const Collections = () => {
  const location = useLocation();
  const hash = location.hash;
  const productId = hash.substring(1);

  const { categoriesMap } = useContext(CategoriesContext);
  let hasProducts = false;

  return (
    <>
      {Object.keys(categoriesMap).map((title, index) => {
        const products = categoriesMap[title];

        if (products && products.length > 0) {
          hasProducts = true;

          return (
            <div key={index}>
              <Container className='card no-padding-container bg-dark category-preview mb-1'>
                <h2 className='title'>
                  <Link to={title}>
                    <span className='p-2 text-white'>
                      {title.toUpperCase()}
                    </span>
                  </Link>
                </h2>
                <div
                  key={index}
                  className={
                    products?.length < 3
                      ? 'preview-container-df'
                      : `preview-container-dg`
                  }
                >
                  {products
                    .filter((_, idx) => idx < 4)
                    .map((product, index) => (
                      <section key={index} id={product.id}>
                        <ProductCard
                          key={index}
                          product={product}
                          productId={productId} 
                        />
                      </section>
                    ))}
                </div>
              </Container>
            </div>
          );
        }
        return null;
      })}

      {hasProducts && <div className='lg-div'></div>}

      {!hasProducts && (
        <div className='card container p-2 bg-ws vh-100'>
          <hr className='-mt' />
          <p className='mx-auto fs-large'>
            No product available now... Try again later
          </p>
        </div>
      )}
    </>
  );
};

export default Collections;