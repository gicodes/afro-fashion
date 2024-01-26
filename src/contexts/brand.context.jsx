import { getItemsByBrandName } from "../utils/firebase.utils";
import { createContext, useState, useEffect } from 'react';

export const BrandContext = createContext({
  BrandNames: {},
  searchItemsByBrand: () => {},
});

export const BrandProvider = ({ children }) => {
  const [brandsMap, setBrandsMap] = useState({});

  useEffect(() => {
    const getBrandName = async () => {
      const brandMap = await getItemsByBrandName();
      setBrandsMap(brandMap);
    }

    getBrandName();
  }, []);

  const searchItemsByBrand = async (brandName) => {
    if (!brandName || brandName.trim() === "") {
      return [];
    }

    const items = await getItemsByBrandName(brandName);
    return items;
  };

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