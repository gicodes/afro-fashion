/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useContext } from 'react';
import CollectionPreview from './mobile.preview';
import { CategoriesContext } from '../../../contexts/categories.context';


const Collections = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CollectionPreview key={title} title={title} products={products} />
          )
        })
      }
    </>
  )
}

export default Collections;