/* This is a Desktop first Component. Designed to render on Desktop Devices */

import { Fragment, useContext } from "react";
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

  return (
    <Fragment>
      <Container className="container">
        <nav className="navbar bg-gw">
          <div className="container-fluid">
            <Link className="navigation navbar-brand" to='/'>
              <Logo/>
            </Link>
            <ul className="nav nav-tabs justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" to='shop'>
                  SHOP
                </Link>
                
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='auth'>
                  SELL
                </Link>
              </li>
              <li className="nav-item" style={{marginRight: '20px'}}>
                <CartIcon />
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
            </ul>
          </div>
          {isCartOpen && <CartDropdown />}
        </nav>
        <Outlet />
        <br/>
      </Container>
    </Fragment>
  )
}


export default NavBarComponent;