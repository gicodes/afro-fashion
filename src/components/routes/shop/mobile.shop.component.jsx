/* This is a Mobile first Component. Designed to render on Mobile Devices */

import { Route, Routes } from 'react-router-dom';

import Category from '../category/mobile.category.route';
import Collections from '../../collection/collections/mobile.shopItems';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<Collections />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop;