/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { Fragment, useContext, useState } from "react";
import { Outlet, Link } from "react-router-dom";

import { Container, Navbar } from "react-bootstrap";
import { LuLogIn, LuUserCheck } from "react-icons/lu";
import { UserContext } from "../../../contexts/user.context";

import { SignOutUser } from "../../../utils/firebase.utils";
import CartIcon from "../../cartServices/cart-icon/cart-icon.components";
import CartDropdown from "../../cartServices/cart-dropdown/mobile.cart-dropdown";

import BurgerMenu from './mobile.navdrop';
import './navbar.styles.scss'

const MobileNavBar = () => {
  const { currentUser } = useContext(UserContext);

  const [ isBurger, setBurger ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  
  function toggleMenu() {
    if (isBurger) {
      setBurger(false);
    }
    else { setBurger(true)}
  }

  function toggleCart() {
    if (cartOpen) {
      setCartOpen(false);
    }
    else { setCartOpen(true)}
  }

  return (
    <Fragment>
      <Container className="container no-padding-container">
        <nav className="nav bg-gw">

          <div className="container-fluid">
            <div className="nav-burger">
              <button 
                type="button" 
                onClick={toggleMenu}
                className="navbar-toggler burger-button"
              >
                <div className="animated-icon1">                      
                  <span>
                  </span>
                
                  <span>
                  </span>
                      
                  <span>
                  </span>
                </div>
              </button>

              <Navbar.Brand className="nav-brand">
                <Link to="/"><h1>
                  <span className="green">A</span>F
                </h1></Link>
              </Navbar.Brand>

              <div className="burger-end">
                <span onClick={toggleCart}><CartIcon /></span>
                
                <div className="auth-icon">
                  {
                  currentUser ? (
                    <Link className="nav-link"                       
                      onClick={SignOutUser}> 
                      <LuUserCheck/>                       
                    </Link>
                    ) : (
                    <Link className="nav-link"
                      to='/auth'>
                        <LuLogIn/>
                      </Link>
                    )
                  }
                </div>
              </div>
            </div>
          </div>

          {cartOpen && <CartDropdown />}
        </nav>
        {isBurger && <BurgerMenu />}
        <Outlet />
      </Container>
    </Fragment>
  )
}

export default MobileNavBar;