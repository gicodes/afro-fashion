import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getItemsBySellers } from "../utils/firebase.utils";
import { useLoading } from './loading.context';

export const BrandContext = createContext({
  brandItemsMap: {},
  searchItemsByBrand: () => {},
});

export const BrandProvider = ({ children }) => {
  const [brandItemsMap, setBrandItemsMap] = useState({});
  const { showLoading, hideLoading } = useLoading();

  // Memoize the mapBrandItems function to prevent unnecessary re-renders
  const mapBrandItems = useCallback(async () => {
    showLoading();
    try {
      const brandMap = await getItemsBySellers();
      setBrandItemsMap(brandMap);
    } catch (error) {
      console.error('Error fetching brand items:', error);
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    mapBrandItems();
  }, [mapBrandItems]);

  // Memoize the searchItemsByBrand function
  const searchItemsByBrand = useCallback(async (sellerName) => {
    const trimmedSellerName = typeof sellerName === 'string' ? sellerName.trim() : '';
    if (!trimmedSellerName) return [];
  
    try {
      const itemsBySellers = await getItemsBySellers();
      const filteredBrands = Object.entries(itemsBySellers)
        .filter(([seller]) =>
          seller.toLowerCase().includes(trimmedSellerName.toLowerCase())
        )
        .map(([seller, items]) => ({
          name: seller,
          items, // Include items associated with each seller
        }));
  
      return filteredBrands;
    } catch (error) {
      console.error('Error searching items by brand:', error);
      return [];
    }
  }, []);  

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    brandItemsMap,
    searchItemsByBrand,
  }), [brandItemsMap, searchItemsByBrand]);

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
};
