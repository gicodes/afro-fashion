import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { categories } from '../components/collection/collection.component.tsx';
import { getCategoriesCollection } from '../utils/firebase.utils.ts';
import { useLoading } from './loading.context.tsx';

interface CategoryInfo {
  title: string;
  description: string;
}

interface CategoriesContextType {
  categoriesMap: Record<string, CategoryInfo>;
  categoriesInfo: CategoryInfo[];
  searchProductsWithCategory: (productName: string) => Promise<{ title: string; items: unknown}[]>;
}

export const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading();
  const [categoriesInfo, setCategoriesInfo] = useState<CategoryInfo[]>([]);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, CategoryInfo>>({});

  // Memoize the category info processing
  const processedCategoriesInfo = useMemo(() => {
    if (categories) {
      return categories.map(item => ({
        title: item?.title?.toLowerCase().trim(),
        description: item?.description,
      }));
    }
    return [];
  }, []);

  // useCallback to memoize getCategories function
  const getCategories = useCallback(async () => {
    showLoading();
    try {
      const categoryMap = await getCategoriesCollection();
      setCategoriesMap(categoryMap);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  useEffect(() => {
    setCategoriesInfo(processedCategoriesInfo);
    getCategories();
  }, [processedCategoriesInfo, getCategories]);

  // Memoize the searchProductsWithCategory function
  const searchProductsWithCategory = useCallback(async (productName) => {
    const trimmedProductName = typeof productName === 'string' ? productName.trim() : '';
    if (!trimmedProductName) return [];
  
    try {
      const categoriesCollection = await getCategoriesCollection();
  
      const resultsMap = new Map();
  
      Object.entries(categoriesCollection).forEach(([category, products]) => {
        const matchingProducts = (products as { name: string; id: string }[]).filter((product) =>
          product.name.toLowerCase().includes(trimmedProductName.toLowerCase())
        );
  
        if (matchingProducts.length > 0) {
          if (!resultsMap.has(category)) {
            resultsMap.set(category, {
              title: category,
              items: [],
            });
          }
  
          matchingProducts.forEach((product) => {
            resultsMap.get(category).items.push({
              type: 'product',
              name: product.name,
              link: `marketplace/products/${product.id}`,
            });
          });
        }
      });
  
      // Add category links without duplication
      resultsMap.forEach((result, category) => {
        result.items.push({
          type: 'category',
          name: category,
          link: `marketplace/category/${category}`,
        });
      });
  
      return Array.from(resultsMap.values());
    } catch (error) {
      console.error('Error searching products with category:', error);
      return [];
    }
  }, []);

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({
    categoriesMap,
    categoriesInfo,
    searchProductsWithCategory,
  }), [categoriesMap, categoriesInfo, searchProductsWithCategory]);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};