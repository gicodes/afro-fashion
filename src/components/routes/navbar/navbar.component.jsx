/* This is a Desktop first Component. Designed to render on Desktop Devices */

import { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { Container } from "react-bootstrap";
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
  const [ cartOpen, setCartOpen ] = useState(false);

  function toggleCart() {
    if (cartOpen) {
      setCartOpen(false);
    }
    else { setCartOpen(true)}
  }

  return (
    <Fragment>
      <Container className="container no-padding-container">
        <nav className="navbar">
          <div className="container-fluid is-lg">
            <Link className="navigation navbar-brand" to='/'>
              <Logo/>
            </Link>
            <ul className="nav nav-tabs justify-content-end bg-gw isl-menu">
              <li className="nav-item">
                <Link className="nav-link" to='shop'>
                  <span className="nav-title">SHOP</span>
                </Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='auth'>
                  SELL
                </Link>
              </li>
              <li className="nav-item" style={{marginRight: '20px'}}>
                <span onClick={toggleCart}><CartIcon /></span>
              </li>
              <li className="nav-item">
                {
                  currentUser ? (
                    <Link className="nav-link active" aria-current="page"
                      onClick={SignOutUser}>
                      LOGOUT
                    </Link>
                  ) : (
                    <Link className="nav-link active" aria-current="page"
                      to='auth'>
                      LOGIN 
                    </Link>
                  )
                }
              </li>
            {isCartOpen && <CartDropdown />}
            </ul>
          </div>
        </nav>
        <Outlet />
        <br/>
      </Container>
    </Fragment>
  )
}


export default NavBarComponent;