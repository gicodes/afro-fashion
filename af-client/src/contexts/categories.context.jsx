import { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { categories } from '../components/collection/collection.component';
import { getCategoriesCollection } from '../utils/firebase.utils';
import { useLoading } from './loading.context';

export const CategoriesContext = createContext({
  categoriesMap: {},
  categoriesInfo: {},
});

export const CategoriesProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading();
  const [categoriesMap, setCategoriesMap] = useState({});
  const [categoriesInfo, setCategoriesInfo] = useState([]);

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

  // Memoize the context value to avoid unnecessary re-renders
  const value = useMemo(() => ({
    categoriesMap,
    categoriesInfo,
  }), [categoriesMap, categoriesInfo]);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};