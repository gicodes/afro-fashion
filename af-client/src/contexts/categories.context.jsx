import { getCollectionAndDocuments } from '../utils/firebase.utils';
import { createContext, useState, useEffect } from 'react';
import { useLoading } from './loading.context';

export const CategoriesContext = createContext({
  Categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    const getCategories = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);
    }

    getCategories();
    hideLoading();
  }, [showLoading, hideLoading])

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}