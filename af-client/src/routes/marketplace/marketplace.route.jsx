import Category from '../category/category.route';
import { Route, Routes } from 'react-router-dom';
import Product from '../products/product.route';
import Collections from './shop';

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