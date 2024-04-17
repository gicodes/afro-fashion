import { getProductById } from '../../../utils/firebase.utils';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ProductCard from './product-card';

const Product = () => {
  const { product } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(product);
      setProductData(data);
    };

    fetchProduct();
  }, [product]);

  return (
    <section id={product} className='col-md-4 mx-auto mt-1'>
      <Container className="card no-padding-container">
        {productData && <ProductCard key={productData.id} product={productData} />}
      </Container>
    </section>
  );
};

export default Product;