import { Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductCard from '../products/product-card.tsx';
import { getSellerInfo } from '../../utils/firebase.utils.ts';
import { useLoading } from '../../contexts/loading.context.tsx';
import { BrandContext } from '../../contexts/brand.context.tsx';
import React, { useContext, useState, useEffect } from 'react';
import SellerCardIndex from '../dashboard/index/seller/seller-card.tsx';

import './brands.styles.scss';

// Brand collection is rendered from any brands route to a seller's page
const BrandCollection: React.FC = () => {
  const { seller } = useParams();
  const brandContext = useContext(BrandContext);
  const brandItemsMap = brandContext?.brandItemsMap || {};
  const { showLoading, hideLoading } = useLoading();
  const [sellerInfo, setSellerInfo] = useState<any>({});
  const [brands, setBrands] = useState<any[]>([]);
  
  useEffect(() => {
    if (!seller) return;

    showLoading();
    if (brandItemsMap[seller] !== brands) setBrands(brandItemsMap[seller]);
  
    const fetchData = async () => {
      const info = await getSellerInfo(seller);
      setSellerInfo(info);
    }

    fetchData();
    hideLoading();
  }, [showLoading, seller, brandItemsMap, hideLoading, brands]);
  
  if (!seller) {
    return <div>Seller not found</div>;
  }

  const sellerName = seller[0].toUpperCase() + seller.slice(1);
  const { address, bio, imageUrl, phone, products, sold } = sellerInfo;

  return (
    <section id={seller?.toLowerCase()} className="seller-brand-section">
      <div className="seller-card">
        <SellerCardIndex 
          bio={bio}
          address={address}
          imageUrl={imageUrl}
          brandName={sellerName}
          displayName={sellerName}
          sold={sold}
          phone={phone}
          products={products}
          // bank && bankAcct data are unavailable
          // to add more data, import from sellerInfo
          bank={null} 
          bankAcct={null} 
          toggleEditProfile={null} 
        />
      </div>
  
      { brands && Object.keys(brands)?.length > 0 ? (
        <div>
          <Paper className="products-container">
            {Object.entries(brands).map(
              ([category, categoryProducts]) => (
              <div 
                key={category} 
                className="seller-category"
                >
                <div 
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
