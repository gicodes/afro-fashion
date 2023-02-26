import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";

import { SignOutUser } from "../../../utils/firebase.utils";
import { ReactComponent as Logo } from "../../assets/afro-fa.svg";
import CartIcon from "../../cartsets/cart-icon/cart-icon.components";
import CartDropdown from "../../cartsets/cart-dropdown/cart-dropdown";

import './navbar.styles.scss'

const NavBarComponent = () => {

  const { isCartOpen } = useContext(CartContext);
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <Logo />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <Link className="nav-link"
                onClick={SignOutUser}>
                SIGN OUT
              </Link>
            ) : (
              <Link className="nav-link"
                to='auth'>
                SIGN IN
              </Link>
            )
          }
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  )
}


export default NavBarComponent;