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
import { SideNav } from "./side-nav";
import './navbar.styles.scss'

const MobileNavBar = () => {
  const { currentUser } = useContext(UserContext);
  const [ isBurger, setBurger ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  
  const authIconStyle = {
    backgroundColor: currentUser ? 'green' : 'yellow',
    borderRadius: '50%',  
    width: '35px',        
    height: '35px',       
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',         
  }

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

  const handleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

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
                  <span></span>
                
                  <span></span>
                      
                  <span></span>
                </div>
              </button>

              <Navbar.Brand className="nav-brand">
                <Link to="/">
                  <h1>
                    <span className="green">A</span>F
                  </h1>
                </Link>
              </Navbar.Brand>

              <div className="burger-end">
                <span onClick={toggleCart}><CartIcon /></span>
                
                <div className={"auth-icon"} style={authIconStyle}>
                  {
                  currentUser ? (
                    <span className="nav-link"                       
                      onClick={handleSideNav}>
                      <LuUserCheck color="white"/>                       
                    </span>
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
          <div className={currentUser ? "side-nav" : "dis-non"}>
          {showSideNav && (
            <SideNav
              displayName={currentUser?.displayName}
              onSignOut={SignOutUser}
            />
          )}
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