/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Route, Routes } from "react-router-dom";
import ShopStore from "../shop/mobile.shop.component.jsx";
import NavBar from "../navbar/mobile.navbar.component.jsx";
import SignUp from "../authentication/user-auth/mobile.sign-up.component.jsx";
import Collection from "../../collection/mobile.collection.component.jsx";
import Checkout from "../../cartServices/checkout/checkout.component.jsx";
import SignIn from "../authentication/user-auth/mobile.sign-in.component.jsx";


const Home = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar />} >
        <Route index element={<Collection />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="auth/register" element={<SignUp/>} />
        <Route path="shop/*" element={<ShopStore />} />
        <Route path="checkout" element={<Checkout />} />
        {/* <Route path="user" element={<Buyer/>} />
        <Route path="user/seller" element={<Seller/>} /> */}
      </Route>
    </Routes>
  )
}

export default Home;