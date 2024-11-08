import { getProductById } from '../../utils/firebase.utils';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
      {productData && <ProductCard key={productData.id} product={productData} />}
    </section>
  );
};

export default Product;