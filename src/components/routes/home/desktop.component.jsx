/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { Route, Routes } from "react-router-dom";
import Seller from "../seller/sell.component.jsx";
import ShopStore from "../shop/shop.component.jsx";
import NavBar from "../navbar/navbar.component.jsx";
import Collection from "../../collection/collection.component.jsx";
import SignIn from "../authentication/user-auth/sign-in.component.jsx";
import SignUp from "../authentication/user-auth/sign-up.component.jsx";
import Checkout from "../../cartServices/checkout/checkout.component.jsx";

const Home = () => {
  return (
    <Routes>
      {/* is the home page "/" everyt other route inside it becomes a nested route */}
      <Route path='/' element={<NavBar />} >
        <Route index element={<Collection />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="auth/register" element={<SignUp/>} />
        <Route path="shop/*" element={<ShopStore />} />
        <Route path="checkout" element={<Checkout />} />
        {/* <Route path="user" element={<Buyer/>} /> */}

        {/* This is where the seller route is defined */}
        <Route path="user/seller" element={<Seller/>} />

      </Route>
    </Routes>
  )
}


export default Home;