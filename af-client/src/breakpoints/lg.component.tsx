/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import React, { useContext } from 'react';
import Page404 from '../redirect/404.tsx';
import { Route, Routes } from 'react-router-dom';
import FailedOperation from '../redirect/failedOp.tsx';
import PaymentSuccessful from '../redirect/paySuccess.tsx';
import { UserContext } from "../contexts/user.context.tsx";
import AuthLanding from '../redirect/authLanding.tsx';
import AdminIndex from '../routes/admin/admin.index.tsx';
import Footer from '../index/footer/footer.tsx';
import NavBar from '../navbar/lg.navbar.component.tsx';
import PasswordReset from '../redirect/passwordReset.tsx';
import VerificationSuccess from '../redirect/verifySuccess.tsx';
import HomeIndex from '../index/lg.home.component.tsx';
import CreditsPage from '../routes/credits/credits.tsx';
import { Help } from '../routes/help/help.gram.tsx';
import BrandsPage from '../routes/brands/brands.page.tsx';
import Checkout from '../components/checkout/checkout.component.tsx';
import BrandCollection from '../routes/brands/brands.route.tsx';
import MarketPlace from '../routes/marketplace/marketplace.route.tsx';
import UserProfile from '../routes/dashboard/user/user.component.tsx';
import Seller from '../routes/dashboard/index/seller/seller-component.tsx';
import SignIn from '../routes/authentication/user-auth/lg.sign-in.index.tsx';
import SignUp from '../routes/authentication/user-auth/lg.sign-up.index.tsx';
import Subscription from '../routes/dashboard/subscriptions/subscription.tsx';
import ProtectedUserRoute from '../routes/dashboard/user/protected-route.tsx';
import ProtectedSellerRoute from '../routes/dashboard/index/seller/protected-route.tsx'; 
import { AcceptTerms } from '../routes/authentication/seller-auth/accept-terms.tsx';
import { PrivacyPolicy, TermsOfService } from '../index/indexServices/learn-about-af.tsx';


const Index = () => {
  const { currentUser } = useContext(UserContext);
  const userType = currentUser?.userType;

  // Maintaining "auth.me" for all users, "auth.admin" for admin-specific, and "auth.user" for user-specific routes and roles
  
  return (
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<HomeIndex />} />
        <Route path="help" element={<Help />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="terms-of-service" element={<TermsOfService />} />
        <Route path="auth/register" element={<SignUp />} />
        <Route path="marketplace/*" element={<MarketPlace />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="auth/accept-seller-terms" element={<AcceptTerms />} />
        <Route path="auth.admin" element={<AdminIndex />} />
        <Route path="auth.me" element={<AuthLanding/>} />
        <Route path="auth/verify-email" element={<VerificationSuccess />} />
        <Route path="auth/password-reset" element={<PasswordReset actionCode={undefined} />} />
        {userType === 'seller' ? (
          <Route path="dashboard" element={<ProtectedSellerRoute element={<Seller />} />} />
        ) : (
          <Route path="dashboard" element={<ProtectedUserRoute element={<UserProfile />} />} />
        )}
        <Route path="brands/:seller" element={<BrandCollection />}>
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="subscriptions" element={<Subscription />}>
          <Route path="subscriptions/:seller" element={<ProtectedSellerRoute element={undefined} />} />
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