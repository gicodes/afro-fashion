/* This is a Desktop first Component. Designed to render on Desktop Devices */

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