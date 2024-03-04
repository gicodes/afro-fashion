import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card';
import { CategoriesContext } from '../../../contexts/categories.context';

import './marketplace.styles.scss';

// collections as categories mapped to shop route
const MarketPlace = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  let hasProducts = false;

  return (
    <>
      {
        Object.keys(categoriesMap).map((title, index) => {
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
                  <div key={index} className={products?.length < 3 ? 'preview-container-df' : `preview-container-dg`}>
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
              </div>
            )
          }

          return null;
      })}

      { hasProducts && <div className='lg-div'></div> }

      {
        !hasProducts && (
        <div className="card container p-2 bg-ws lg-div">
          <hr className='-mt'/>
          <p className='mx-auto fs-large'>No product available now... Try again later</p>
        </div>
      )}
    </>
  )
}

export default MarketPlace;