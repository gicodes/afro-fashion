/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import CartDropdown from "../../cartServices/cart-dropdown/mobile.cart-dropdown";
import CartIcon from "../../cartServices/cart-icon/cart-icon.components";
import { Fragment, useContext, useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import { SignOutUser } from "../../../utils/firebase.utils";
import { useAlert } from "../../../contexts/alert.context";
import { LuLogIn, LuUserCheck } from "react-icons/lu";
import { Container, Navbar } from "react-bootstrap";
import BurgerMenu from './nav-drop.mobile';
import { SideNav } from "./auth-nav";

import './navbar.styles.scss'

const MobileNavBar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [ isBurger, setBurger ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const [ showSideNav, setShowSideNav ] = useState(false);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();

  const handleSideNav = () => {
    setShowSideNav(!showSideNav);
  };
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showSideNav) {
        setShowSideNav(false);
      }
    }, 4999);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, [showSideNav]);

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

  const handleSignOut = (event) => {
    event.preventDefault();
  
    const handleYes = () => {
      SignOutUser();
      addAutoCloseAlert("success", `You are now signed out! see you soon  🤗`)
      navigate('/auth')
    };
    const handleNo = () => {
      addAutoCloseAlert("warning", `Sign out operation cancelled!`)
    };
    
    addOptionsAlert(
      'warning',
      'Are you signing out?',
      handleYes, handleNo
    );
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
                  <span></span>
                  <span></span>    
                  <span></span>
                </div>
              </button>

              <div className="force-af-center"></div>
              <Navbar.Brand className="nav-brand">
                <Link to="/">
                  <h1 className="shake">
                    <span className="green">A</span>F
                  </h1>
                </Link>
              </Navbar.Brand>
              <div></div>

              <div className="burger-end">
                <span className="p-1" onClick={toggleCart}><CartIcon /></span>
                
                <div className={"auth-icon"} style={authIconStyle}>
                  {currentUser ? (
                    <span className="nav-link"                       
                      onClick={handleSideNav}>
                      <LuUserCheck color="white"/>                       
                    </span>
                    ) : (
                    <Link className="nav-link"
                      to='/auth'>
                        <LuLogIn/>
                      </Link>
                   )}
                </div>
              </div>
            </div>
          </div>
          <div className={currentUser ? "side-nav" : "dis-non"}>
          {showSideNav && (
            <SideNav
              displayName={currentUser?.displayName}
              onSignOut={handleSignOut}
              device_class={"drop"}
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