import { categories } from '../components/collection/collection.component';
import { getCollectionAndDocuments } from '../utils/firebase.utils';
import { createContext, useState, useEffect } from 'react';
import { useLoading } from './loading.context';

export const CategoriesContext = createContext({
  CategoriesMap: {},
  categoriesInfo: {},
});

export const CategoriesProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading();
  const [ categoriesMap, setCategoriesMap ] = useState({});
  const [ categoriesInfo, setCategoriesInfo ] = useState({});

  useEffect(() => {
    showLoading();

    const getCategories = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);
    }

    if (categories) {
      const categoryInfo = categories?.map((item) => (
        { 
          title: item?.title?.toLowerCase().trim(),
          description: item?.description 
        }
      ));

      setCategoriesInfo(categoryInfo);
    }

    getCategories();

    hideLoading();
  }, [showLoading, hideLoading])

  const value = {
    categoriesMap, 
    categoriesInfo,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}