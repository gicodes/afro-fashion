import { useParams } from 'react-router-dom';
import ProductCard from '../products/product-card';
import { useContext, useState, useEffect } from 'react';
import { getSellerInfo } from '../../../utils/firebase.utils';
import { useLoading } from '../../../contexts/loading.context';
import { BrandContext } from '../../../contexts/brand.context';
import SellerCardIndex from '../dashboard/index/seller-card';

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

  const sellerName = seller[0].toUpperCase() + seller.slice(1);
  
  const { address, bank, bankAcct, bio, imageUrl, phone, sold } = sellerInfo;

  return (
    // section id issues a brand with a dynamic link to target
    <section id={seller?.toLowerCase()}>
      <div className='m-2 seller-card'>
        <SellerCardIndex 
          brandName={sellerName || "N/A"}
          address={address || "Missing info"}
          bank={bank || "N/A"}
          bankAcct={bankAcct || "N/A"}
          bio={bio || "Missing info"}
          imageUrl={imageUrl}
          phone={phone || "Missing info"}
          sold={sold || "N/A"}
        />
      </div>

      { brands && Object.keys(brands)?.length > 0 ? (
        <div className='products-container'>
          {Object.entries(brands).map(([category, categoryProducts]) => (
          <div key={category} className='seller-product'>
            {categoryProducts.map((brand) => (
              <div key={brand.id}>
                <ProductCard key={brand.id} product={brand} />
                <br/>
              </div>
            ))}
            <br/>
          </div>
          ))}
        </div>
      ) : (
        <div className='card p-3'>
          <div className='card-body'>
            <p className='mx-auto'>No {seller} items are available at the moment...</p>
          </div>   
        </div>
      )}
      <div className='lg-div' />
    </section>
  );
};

export default BrandCollection;