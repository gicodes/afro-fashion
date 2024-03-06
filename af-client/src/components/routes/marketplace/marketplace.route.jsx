import { Route, Routes } from 'react-router-dom';
import Product from '../products/product.route';
import Collections from './shop';

const MarketPlace = () => {
  return (
    <Routes>
      <Route path=':product' element={<Product />} />
      <Route index element={<Collections />} />
    </Routes>
  )
}

export default MarketPlace;