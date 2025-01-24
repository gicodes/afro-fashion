import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getItemsBySellers } from '../utils/firebase.utils.ts';
import { useLoading } from './loading.context.tsx';

interface BrandContextType {
  brandItemsMap: Record<string, any>;
  searchItemsByBrand: (sellerName: string) => Promise<{ name: string; items: unknown; }[]>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }) => {
  const [brandItemsMap, setBrandItemsMap] = useState<Record<string, any>>({});
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

export default BrandContext;