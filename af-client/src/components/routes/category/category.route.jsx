import { CategoriesContext } from '../../../contexts/categories.context';
import { useLoading } from '../../../contexts/loading.context';
import { useContext, useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './category.styles.scss';

// category route is rendered when users click on a category from the index page
const Category = () => {
  const { category } = useParams(); 
  const { showLoading, hideLoading } = useLoading(); 
  const { categoriesMap } = useContext(CategoriesContext);
  const [ products, setProducts ] = useState(categoriesMap[category]);

  useEffect(() => {
    showLoading();
    if (categoriesMap[category]) {
      setProducts(categoriesMap[category]);
    }
    hideLoading();
  }, [category, showLoading, hideLoading, categoriesMap]);

  return (
    // section id issues a category with a dynamic link to target
    <section id={category}>
      <Container className="card no-padding-container bg-dark">
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
                <section id={product.id}>
                  <ProductCard key={product.id} product={product} />
                </section>
            ))
          }
        </div>
        )}
        <h1 className='category-title'>
          <span className='p-2 text-white'>{category?.toUpperCase()}</span>
        </h1>
      </Container>
      <div className='lg-div'></div>
    </section>
  )
}

export default Category;