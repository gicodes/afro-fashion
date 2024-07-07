import { CategoriesContext } from '../../../contexts/categories.context';
import { useContext, useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import { useParams } from 'react-router-dom';
import './category.styles.scss';

// category route is rendered when users click on a category from the index page
const Category = () => {
  const { category } = useParams(); 
  const { categoriesMap } = useContext(CategoriesContext);
  const [ products, setProducts ] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    // section id issues a category with a dynamic link to target
    <section id={category}>
      <div className="category-route">
        <h1 className='category-title'>
          {category?.toUpperCase()}
        </h1>
        <hr className='bg-white'/>
        { !products?.length > 0 ? (
          <>
            <p className='text-center mt-5 pb-4 text-secondary'>
              Nothing on {category} right now. Try again later!
            </p>
          </>
        ) : (
        <div className={products?.length < 3 ? 'category-route-container-df' : `category-route-container-dg`}>
          {
            products && products.map(
              (product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                />
            ))
          }
        </div>
        )}
      </div>
    </section>
  )
}

export default Category;