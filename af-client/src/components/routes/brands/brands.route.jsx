import SellerCard from './seller-card';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from '../../products/product-card';
import { useContext, useState, useEffect } from 'react';
import { getSellerInfo } from '../../../utils/firebase.utils';
import { useLoading } from '../../../contexts/loading.context';
import { BrandContext } from '../../../contexts/brand.context';

import './brands.styles.scss';

export const blankAvi = "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="

// category route is rendered when users search and go to a brand / seller's page
const BrandCollection = () => {
  const { seller } = useParams();
  const { brandsMap } = useContext(BrandContext);
  const { showLoading, hideLoading } = useLoading();
  const [ sellerInfo, setSellerInfo ] = useState([]);
  const [ brands, setBrands ] = useState(brandsMap[seller]);
  
  useEffect(() => {
    showLoading();
    
    if (brandsMap[seller] !== brands) setBrands(brandsMap[seller]);
  
    const fetchData = async () => {
      const info = await getSellerInfo(seller);
      setSellerInfo(info);
    }

    fetchData();
    hideLoading();
  }, [showLoading, seller, brandsMap, hideLoading, brands]);

  return (
    // section id issues a brand with a dynamic link to target
    <section id={seller?.toLowerCase()}>
      <Container className="card container bg-ws mx-auto">
        <h1 className='mt-5 mx-auto'>
          {seller?.toUpperCase()}
        </h1>

        {brands && Object.keys(brands)?.length > 0 ? (
          <>
            <SellerCard sellerInfo={sellerInfo}/>
            
            {/* scaling: brands can return more info i.e. Number of products, number of sales */}
            <p className='mt-5 mx-auto font-awesome'>
              <span>Browse {seller} products from {Object.keys(brands)?.length} {Object.keys(brands)?.length !== 1 ? ("categories") : ("category")}</span>
            </p>
            
            <div className='brand-route-container mb-2'>
              {Object.entries(brands).map(([category, categoryProducts]) => (
              <div key={category}>
                <h6 className='btn btn-primary p-2 fw'>
                  {category.toUpperCase()}
                </h6>

                {categoryProducts.map((brand) => (
                  <ProductCard key={brand.id} product={brand} />
                ))}
                <br/>
              </div>
            ))}
          </div>
        </>
        ) : (
        <>
          <hr className='-mt' />
          <p className='mx-auto'>No {seller} items are available at the moment...</p>
        </>
        )}
      </Container>
      <div className='lg-div'></div>
    </section>
  );
};

export default BrandCollection;