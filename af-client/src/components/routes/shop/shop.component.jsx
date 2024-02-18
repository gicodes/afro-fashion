/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { Route, Routes } from 'react-router-dom';

import Category from '../category/category.route';
import Collections from '../../collection/collections/shopItems';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<Collections />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop;