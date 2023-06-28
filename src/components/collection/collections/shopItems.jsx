import { useContext } from 'react';
import CollectionPreview from './preview';
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