import { CategoriesContext } from '../../../contexts/categories.context';
import { useContext, useState, useEffect } from 'react';
import ProductCard from '../products/product-card';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import './category.styles.scss';
import RoundCircleCard from '../../assets/circle/round-circle';

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
      <Container className="card vh-100">
        <h1 className='category-title'>
          <RoundCircleCard title={category?.toUpperCase()} />
        </h1>
        { !products?.length > 0 ? (
          <>
            <p className='mx-auto m-3 text-secondary'>
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
      </Container>
    </section>
  )
}

export default Category;