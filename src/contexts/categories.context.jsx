import { getCollectionAndDocuments } from '../utils/firebase.utils';
import { createContext, useState, useEffect } from 'react';

export const CategoriesContext = createContext({
  Categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);
    }

    getCategories();
  }, [])

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}