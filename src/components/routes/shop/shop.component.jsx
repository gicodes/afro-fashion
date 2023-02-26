import { Route, Routes } from 'react-router-dom';

import Category from '../category/category.route';
import Collections from '../../collection/collections';

const Shop = () => {
  return (
    <Routes>
      <Route index element={<Collections />} />
      <Route path=':category' element={<Category />} />
    </Routes>
  )
}

export default Shop;