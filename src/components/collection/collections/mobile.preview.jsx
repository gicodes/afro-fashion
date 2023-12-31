/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import './preview.styles.scss';

import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from '../../products/product-card'


const CollectionPreview = ({ title, products }) => {
  return (
    <>
      {/* br suits the temporary gap-design solution between the parent container and nav */}
      <br/>
      <Container className='card container bg-ws'>
        <br/>
        <h2 className='title mx-auto'>
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
    </>
  )
}

export default CollectionPreview;