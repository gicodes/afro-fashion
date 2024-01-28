import { getItemsBySellers } from "../utils/firebase.utils";
import { createContext, useState, useEffect } from 'react';

export const BrandContext = createContext({
  brandsMap: {},
  searchItemsByBrand: () => {},
});

export const BrandProvider = ({ children }) => {
  const [brandsMap, setBrandsMap] = useState({});

  useEffect(() => {
    const getBrandName = async () => {
      const brandMap = await getItemsBySellers();
      setBrandsMap(brandMap);
    };

    getBrandName();
  }, []);

  const searchItemsByBrand = async (sellerName) => {
    const trimmedSellerName = typeof sellerName === 'string' ? sellerName.trim() : '';
  
    if (!trimmedSellerName || trimmedSellerName === "") {
      return [];
    }
  
    const itemsBySellers = await getItemsBySellers();
  
    const filteredBrands = Object.entries(itemsBySellers)
      .filter(([seller]) => seller.toLowerCase()
      .includes(trimmedSellerName.toLowerCase()))
      .flatMap(([items]) => items);
  
    return filteredBrands;
  };
  ;

  const value = {
    brandsMap,
    searchItemsByBrand,
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
};