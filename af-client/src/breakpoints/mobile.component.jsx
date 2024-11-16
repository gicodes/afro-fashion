/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { useContext } from 'react';
import Page404 from '../redirect/404.jsx';
import { Route, Routes } from 'react-router-dom';
import FailedOperation from '../redirect/failedOp.jsx';
import Footer from '../index/footer/footer.jsx';
import PaymentSuccessful from '../redirect/paySuccess.jsx';
import { UserContext } from "../contexts/user.context.jsx";
import PasswordReset from '../redirect/passwordReset.jsx';
import VerificationSuccess from '../redirect/verifySuccess.jsx';
import CreditsPage from '../routes/credits/credits.jsx';
import { Help } from '../routes/help/help.gram.jsx';
import Checkout from '../components/checkout/checkout.component.jsx';
import BrandsPage from '../routes/brands/brands.page.jsx';
import NavBar from '../navbar/mobile.navbar.component.jsx';
import HomeIndex from '../index/mobile.home.component.jsx';
import BrandCollection from '../routes/brands/brands.route.jsx';
import MarketPlace from '../routes/marketplace/marketplace.route.jsx';
import UserProfile from '../routes/dashboard/user/user.component.jsx';
import Seller from '../routes/dashboard/index/seller/seller-component.jsx';
import Subscription from '../routes/dashboard/subscriptions/subscription.jsx';
import ProtectedUserRoute from '../routes/dashboard/user/protected-route.jsx';
import SignIn from '../routes/authentication/user-auth/mobile.sign-in.index.jsx';
import SignUp from '../routes/authentication/user-auth/mobile.sign-up.index.jsx';
import ProtectedSellerRoute from '../routes/dashboard/index/seller/protected-route.jsx'; 
import { AcceptTerms } from '../routes/authentication/seller-auth/accept-terms.jsx';
import { PrivacyPolicy, TermsOfService } from '../index/indexServices/learn-about-af.jsx';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const userType = currentUser?.userType;

  return (
    <Routes>
      <Route path='/' element={<NavBar />} >
        <Route index element={<HomeIndex />} />
        <Route path="help" element={<Help />} />
        <Route path='privacy-policy' element={<PrivacyPolicy/>} />
        <Route path='terms-of-service' element={<TermsOfService />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="auth/register" element={<SignUp/>} />
        <Route path="marketplace/*" element={<MarketPlace />} />      
        <Route path='brands' element={<BrandsPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth/accept-seller-terms" element={<AcceptTerms />} />     
        <Route path="auth/verify-email" element={<VerificationSuccess />} />
        <Route path="auth/password-reset" element={<PasswordReset />} />
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
  )
}

export default Home;