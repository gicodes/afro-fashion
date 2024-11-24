import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductCard from '../products/product-card';
import { useContext, useState, useEffect } from 'react';
import { getSellerInfo } from '../../utils/firebase.utils';
import { useLoading } from '../../contexts/loading.context';
import { BrandContext } from '../../contexts/brand.context';
import SellerCardIndex from '../dashboard/index/seller/seller-card';

import './brands.styles.scss';

// Brand collection is rendered from any brands route to a seller's page
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

  const sellerName = seller[0].toUpperCase() + seller.slice(1);
  const { address, bio, imageUrl, phone, products, sold } = sellerInfo;

  return (
    <section id={seller?.toLowerCase()} className="seller-brand-section">
      <div className="seller-card">
        <SellerCardIndex 
          displayName={sellerName}
          brandName={sellerName}
          address={address}
          // bank && bankAcct data are unavailable
          // to add more data, import from sellerInfo
          bio={bio}
          imageUrl={imageUrl}
          phone={phone}
          sold={sold}
          products={products}
        />
      </div>
  
      { brands && Object.keys(brands)?.length > 0 ? (
        <div>
          <Paper  className="products-container">
            {Object.entries(brands).map(
              ([category, categoryProducts]) => (
              <div 
                key={category} 
                className="seller-category"
                >
                <div 
                  key={category?.id} 
                  className={categoryProducts?.length > 1 ? 'seller-products' : 'seller-product'}
                  >
                  { categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div> 
                <br/>
              </div>
            ))}
          </Paper>
          <div className="lg-div bg-white" />
        </div>
      ) : (
        <div className="card p-3">
          <div className="card-body">
            <p className="mx-auto">No {seller} items are available at the moment...</p>
          </div>   
        </div>
      )}
    </section>
  );
};

export default BrandCollection;
