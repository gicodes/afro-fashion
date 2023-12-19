/* This is a Desktop first Component. Designed to render on Desktop Devices */

import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { Container } from "react-bootstrap";
<<<<<<< HEAD
import { LuLogIn, LuLogOut } from "react-icons/lu";
=======
>>>>>>> main__
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
<<<<<<< HEAD
        <nav className="navbar bg-body-light">
=======
        <nav className="navbar bg-gw">
>>>>>>> main__
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
<<<<<<< HEAD
              <li className="nav-item active" aria-current="page">
=======
              <li className="nav-item" style={{marginRight: '20px'}}>
>>>>>>> main__
                <CartIcon />
              </li>
              <li className="nav-item">
                {
                  currentUser ? (
                    <Link className="nav-link active" aria-current="page"
                      onClick={SignOutUser}>
<<<<<<< HEAD
                      LOGOUT <LuLogOut/> 
=======
                      LOGOUT
>>>>>>> main__
                    </Link>
                  ) : (
                    <Link className="nav-link active" aria-current="page"
                      to='auth'>
<<<<<<< HEAD
                      LOGIN <LuLogIn/> 
=======
                      LOGIN 
>>>>>>> main__
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