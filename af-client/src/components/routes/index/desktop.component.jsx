/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { useContext } from 'react';
import Page404 from '../../../redirect/404.jsx';
import CreditsPage from '../credits/credits.jsx';
import { Route, Routes } from 'react-router-dom';
import { Help } from '../help/help.component.jsx';
import BrandsPage from '../brands/brands.page.jsx';
import ShopStore from '../shop/shop.component.jsx';
import NavBar from '../navbar/navbar.component.jsx';
import BrandCollection from '../brands/brands.route.jsx';
import Seller from '../profile/seller/seller.component.jsx';
import UserProfile from '../profile/user/user.component.jsx';
import Checkout from '../../checkout/checkout.component.jsx';
import FailedOperation from '../../../redirect/failedOp.jsx';
import PaymentSuccessful from '../../../redirect/paySuccess.jsx';
import { UserContext } from "../../../contexts/user.context.jsx";
import Collection from '../../collection/collection.component.jsx';
import SignIn from '../authentication/user-auth/sign-in.component.jsx';
import SignUp from '../authentication/user-auth/sign-up.component.jsx';
import ProtectedUserRoute from '../profile/user/protected-route.jsx';
import ProtectedSellerRoute from '../profile/seller/protected-route.jsx'; 
import { AcceptTerms } from '../authentication/seller-auth/accept-terms.jsx';

const Index = () => {
  const { currentUser } = useContext(UserContext);
  const userType = currentUser?.userType;

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route path="help" element={<Help />} />
        <Route index element={<Collection />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="auth/register" element={<SignUp />} />
        <Route path="shop/*" element={<ShopStore />} />
        <Route path='brands' element={<BrandsPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path="checkout" element={<Checkout />} />
        {userType === 'seller' ? (
          <Route path="profile" element={<ProtectedSellerRoute element={<Seller />} />} />
        ) : (
          <Route path="profile" element={<ProtectedUserRoute element={<UserProfile />} />} />
        )}
        <Route
          path="auth/accept-seller-terms"
          element={<AcceptTerms />}
        />
        <Route path="seller/:seller" element={<BrandCollection />}>
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="payments/success" element={<PaymentSuccessful />} />
        <Route path="payments/failed" element={<FailedOperation />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Index;