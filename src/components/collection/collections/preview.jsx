/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import './preview.styles.scss';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card'

// collection preview usually seen on the shop page
const CollectionPreview = ({ title, products }) => {
  return (
    <> 
      <section id={title.toLowerCase()} className='y-m lr-margin'>       
      <Container className='card category-preview bg-ws y-m'>
        <br/>
        <h2 className='title'>
          <Link to={title}>{title.toUpperCase()}</Link>
        </h2>
        <div className='preview'>
          {
            products
              .filter((_, idx) => idx < 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
            ))
          }
          <br/>
        </div>
      </Container>
      </section>
    </>
  )
}

export default CollectionPreview;