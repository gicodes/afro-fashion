import { categories } from '../components/collection/collection.component';
import { getCollectionAndDocuments } from '../utils/firebase.utils';
import { createContext, useState, useEffect } from 'react';
import { useLoading } from './loading.context';

export const CategoriesContext = createContext({
  Categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [ categoriesInfo, setCategoriesInfo ] = useState([]);
  const [ categoriesMap, setCategoriesMap ] = useState({});
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading();
    const getCategories = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);

      const categoryInfo = categories.map((item)=> (
       { 
          title: item?.title?.toLowerCase().trim(),
          description: item?.description 
        }
      ));
      setCategoriesInfo(categoryInfo);
    }

    getCategories();
    hideLoading();
  }, [showLoading, hideLoading, categoriesInfo])

  const value = { categoriesMap, categoriesInfo };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}