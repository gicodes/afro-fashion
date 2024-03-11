import { CategoriesContext } from '../../../contexts/categories.context';
import { useContext, useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

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
      <Container className="card no-padding-container bg-trans">
        { !products?.length > 0 ? (
          <>
            <p className='mx-auto m-3 text-warning'>
              Nothing on {category} right now. Try again later!
            </p>
          </>
        ) : (
        <div className={products?.length < 3 ? 'category-route-container-df' : `category-route-container-dg`}>
          {
            products && products.map(
              (product) => (
                <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        )}
        <h1 className='category-title'>
          <span className='p-2 text-white'>{category?.toUpperCase()}</span>
        </h1>
      </Container>
    </section>
  )
}

export default Category;