/* This is a Desktop first Component. Designed to render on Desktop Devices */

import { Route, Routes } from "react-router-dom";
import ShopStore from "../shop/shop.component.jsx";
import NavBar from "../navbar/navbar.component.jsx";
import Collection from "../../collection/collection.component.jsx";
import Checkout from "../../cartsets/checkout/checkout.component.jsx";
import SignIn from "../authentication/user-auth/sign-in.component.jsx";

const Home = () => {
  return (
    <Routes>
      <Route path='/' element={<NavBar />} >
        <Route index element={<Collection />} />
        <Route path="auth" element={<SignIn />} />
        <Route path="shop/*" element={<ShopStore />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  )
}


export default Home;