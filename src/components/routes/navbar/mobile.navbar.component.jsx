/* This is a Mobile first Component. Designed to render on Mobile Devices */

import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { Container } from "react-bootstrap";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { SignOutUser } from "../../../utils/firebase.utils";
import { ReactComponent as Logo } from "../../assets/afro-fa.svg";
import CartIcon from "../../cartsets/cart-icon/cart-icon.components";
import CartDropdown from "../../cartsets/cart-dropdown/cart-dropdown";

import './navbar.styles.scss'

const MobileNavBar = () => {
  const { isCartOpen } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
<<<<<<< HEAD
      <Container className="container">
        <nav className="nav bg-body-light">
=======
      <Container className="container no-padding-container">
        <nav className="nav bg-gw">
>>>>>>> main__
          <div className="container-fluid">
            <Link className="navigation navbar-brand" to='/'>
              <Logo/>
            </Link>
            <ul className="nav nav-tabs justify-content-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to='shop'>
                  SHOP
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='auth'>
                  SELL
                </Link>
              </li>
              <li className="nav-item active" aria-current="page">
                <CartIcon />
              </li>
              <li className="nav-item">
                {
                  currentUser ? (
                    <Link className="nav-link"
                      onClick={SignOutUser}>
                        <LuLogOut/>
                     </Link>
                  ) : (
                    <Link className="nav-link"
                      to='auth'>
                      <LuLogIn/>
                    </Link>
                  )
                }
              </li>
            </ul>
          </div>
          {isCartOpen && <CartDropdown />}
        </nav>
        <Outlet />
      </Container>
    </Fragment>
  )
}


export default MobileNavBar;