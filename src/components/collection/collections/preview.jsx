/* This is a Desktop first Component. Designed to render on Desktop Devices */

import './preview.styles.scss';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card'


const CollectionPreview = ({ title, products }) => {
  return (
    <Container className='card category-preview'>
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
      </div>
    </Container>
  )
}

export default CollectionPreview;