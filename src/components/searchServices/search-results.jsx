import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './search.styles.scss';
import '../routes/category/category.styles.scss';

import ProductCard from '../products/product-card';
import { Container } from 'react-bootstrap';
import { BrandContext } from '../../contexts/brand.context';

const SearchResults = () => {
  const { brand } = useParams();

  const { brandsMap } = useContext(BrandContext);

  const [brands, setBrands] = useState(brandsMap[brand]);

  useEffect(() => {
    setBrands(brandsMap[brand])
  }, [brand, brandsMap])

  return (
    
    // section id provides a brand with a dynamic link to target
    <section id={brand?.toLowerCase()} className=''>
      <Container className="card container bg-ws">
        <h1 className='category-title y-m'>
          {brand ? brand?.toUpperCase() : 'COMING SOON...'}
        </h1>
        { !brands ? (
          <>
            <hr className='-mt'/>
            <p className='mx-auto'>No {brand} items are available at the moment...</p>
          </>
        ) : (
          <div className='category-route-container'>
            {
              brands && brands.map(
                (product) => (
                  <ProductCard key={brand.id} product={brand} />
              ))
            }
          </div>
        )}
      </Container>
    </section> 
  )
}

// BrandCollection is rendered when users search or click on a brand route
export const BrandCollection = () => {
  const { brand: seller } = useParams();

  return <SearchResults seller={seller} />;
};