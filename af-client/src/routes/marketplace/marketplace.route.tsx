import React from 'react';
import Collections from './collections.tsx';
import Product from '../products/product.route.tsx';
import { Route, Routes } from 'react-router-dom';
import Category from '../category/category.route.tsx';

const MarketPlace = () => {
  return (
    <Routes>
      <Route path='/category/:category' element={<Category />} />
      <Route path='/products/:product' element={<Product />} />
      <Route index element={<Collections />} />
    </Routes>
  )
}

export default MarketPlace;