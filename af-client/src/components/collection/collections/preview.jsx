/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import './preview.styles.scss';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card'

// collection preview usually seen on the shop page
const CollectionPreview = ({ title, products }) => {
  return (
    <> 
      { products.length !== 0 ?  
        <section>
          <Container className='card no-padding-container bg-dark category-preview mb-1'>
            <h2 className='title'>
              <Link to={title}>
                <span className='p-2 text-white'>
                  {title.toUpperCase()}
                </span>
              </Link>
            </h2>
            <div className={products?.length < 3 ? 'preview-container-df' : `preview-container-dg`}>
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
      : (<></>)}
    </>
  )
}

export default CollectionPreview;