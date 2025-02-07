import { useParams } from 'react-router-dom';
import ProductInfo from './product-info.tsx';
import React, { useState, useEffect } from 'react';
import { getProductById } from '../../utils/firebase.utils.ts';

const Product: React.FC = () => {
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
    <section id={product} className='product-route container'>
      {productData && <ProductInfo product={productData} />}
    </section>
  );
};

export default Product;