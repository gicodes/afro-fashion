/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { useContext } from 'react';
import Page404 from '../redirect/404.jsx';
import { Route, Routes } from 'react-router-dom';
import FailedOperation from '../redirect/failedOp.jsx';
import PaymentSuccessful from '../redirect/paySuccess.jsx';
import { UserContext } from "../contexts/user.context.jsx";
import Footer from '../components/index/footer/footer.jsx';
import NavBar from '../components/navbar/lg.navbar.component.jsx';
import VerificationSuccess from '../redirect/verifySuccess.jsx';
import HomeIndex from '../components/index/lg.home.component.jsx';
import CreditsPage from '../components/routes/credits/credits.jsx';
import { Help } from '../components/routes/help/help.gram.jsx';
import BrandsPage from '../components/routes/brands/brands.page.jsx';
import Checkout from '../components/checkout/checkout.component.jsx';
import BrandCollection from '../components/routes/brands/brands.route.jsx';
import MarketPlace from '../components/routes/marketplace/marketplace.route.jsx';
import UserProfile from '../components/routes/dashboard/user/user.component.jsx';
import Seller from '../components/routes/dashboard/index/seller/seller-component.jsx';
import SignIn from '../components/routes/authentication/user-auth/lg.sign-in.index.jsx';
import SignUp from '../components/routes/authentication/user-auth/lg.sign-up.index.jsx';
import Subscription from '../components/routes/dashboard/subscriptions/subscription.jsx';
import ProtectedUserRoute from '../components/routes/dashboard/user/protected-route.jsx';
import ProtectedSellerRoute from '../components/routes/dashboard/index/seller/protected-route.jsx'; 
import { AcceptTerms } from '../components/routes/authentication/seller-auth/accept-terms.jsx';
import { PrivacyPolicy, TermsOfService } from '../components/index/indexServices/learn-about-af.jsx';

const Index = () => {
  const { currentUser } = useContext(UserContext);
  const userType = currentUser?.userType;

  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<HomeIndex />} />
        <Route path="help" element={<Help />} />
        <Route path="auth" element={<SignIn />} />
        <Route path='privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='terms-of-service' element={<TermsOfService />} />
        <Route path="auth/register" element={<SignUp />} />
        <Route path="marketplace/*" element={<MarketPlace />} />
        <Route path='brands' element={<BrandsPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth/accept-seller-terms" element={<AcceptTerms />} />
        <Route path="auth/email-verified" element={<VerificationSuccess />} />
        {userType === 'seller' ? (
          <Route path="dashboard" element={<ProtectedSellerRoute element={<Seller />} />} />
        ) : (
          <Route path="dashboard" element={<ProtectedUserRoute element={<UserProfile />} />} />
        )}
        <Route path="brands/:seller" element={<BrandCollection />}>
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="subscriptions" element={<Subscription />}>
          <Route path="subscriptions/:seller" element={<ProtectedSellerRoute />} />
        </Route>
        <Route path="payments/success" element={<PaymentSuccessful />} />
        <Route path="payments/failed" element={<FailedOperation />} />
        <Route path='/' element={<Footer/>} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default Index;