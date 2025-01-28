/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import CartDropdown from "../components/cartServices/cart-dropdown/mobile.cart-dropdown.tsx";
import CartIcon from "../components/cartServices/cart-icon/cart-icon.components.tsx";
import React, { Fragment, useEffect, useContext, useState } from "react";
import { Navbar, CloseButton, Container } from "react-bootstrap";
import { blankAvi } from "../routes/dashboard/index/dash-assets.tsx";
import { Outlet, Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/user.context.tsx";
import { SignOutUser } from "../utils/firebase.utils.ts";
import { useAlert } from "../contexts/alert.context.tsx";
import BurgerMenu from './mobile.burger.tsx';
import { LuLogIn } from "react-icons/lu";
import NavUserBadge from "./user-badge.tsx";
import { AuthNav } from "./auth-nav.tsx";

import './navbar.styles.scss'

const MobileNavBar = () => {
  const navigate = useNavigate();
  const [ isBurger, setBurger ] = useState(false);
  const [ authNav, setAuthNav ] = useState(false);
  const [ closeBtn, setCloseBtn ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const [ isDisabled, setIsDisabled ] = useState(false);  
  const [ signingOut, setSigningOut ] = useState(false);

  const { addAutoCloseAlert, addOptionsAlert } = useAlert();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => { 
    if (signingOut) clearUserData();
  }, ); 

  const clearUserData = () => setCurrentUser(null);

  const closeMenu = () => setBurger(false);
  const toggleMenu = () => setBurger(!isBurger);
  const toggleCart = () => setCartOpen(!cartOpen);

  const autoCloseNavOps = () => {
    if (cartOpen) setCartOpen(false);
    setCloseBtn(!closeBtn);
    setAuthNav(true);
  }

  const handleSignOut = () => {
    const handleYes = () => {
      setIsDisabled(false); // enable * nav bar(s)
      setSigningOut(true);
      SignOutUser();

      addAutoCloseAlert("success", `You are now signed out! see you soon  🤗`)
      navigate('/auth') 
      setAuthNav(false);
    };

    const handleNo = () => {
      addAutoCloseAlert("warning", `Sign out operation cancelled!`)
      setIsDisabled(false);
      setAuthNav(false); 
    };
    
    setIsDisabled(true); // disable all components
    addOptionsAlert('warning', 'Are you signing out?', handleYes, handleNo);
  }   
  
  const imageUrl = currentUser?.imageUrl || blankAvi;
  
  const authIconStyle = {
    backgroundColor: currentUser ? 'green' : 'yellow',
    padding: 0,
    width: '35px',        
    height: '35px',       
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',   
  }

  return (
    <Fragment>
      <Container className="no-padding-container fixed">
        <nav className="nav container bg-index"> 
          <div className="container-fluid">
            <div className="nav-burger">
              <div
                onClick={toggleMenu}
                className="open-close-nav"
              >
                { !isBurger && 
                  <div className="animated-icon1">                      
                    <span />
                    <span />    
                    <span />
                  </div>
                }
              </div>

              <div className="force-af-center" />
              <Navbar.Brand className="v-center nav-brand mx-auto">
                <Link to="/"> {/* Used as a global navigator to home :/ index */}
                  <h1 className="mt-1 shake">
                    <span className="green">A</span>F
                  </h1>
                </Link>
              </Navbar.Brand>
              <div />

              <div className="burger-end">
                <span className="p-1" onClick={toggleCart}>
                  <CartIcon />
                </span>
                
                <div className={"auth-icon"} style={authIconStyle}>
                  {currentUser ? (
                    <span                       
                      onClick={autoCloseNavOps}>

                      <NavUserBadge   
                        imageUrl={imageUrl}                      
                      />                      
                    </span>
                    ) : (
                    <Link className="nav-link" to='/auth'>
                      <LuLogIn/>
                    </Link>
                    )}
                </div>
              </div>
            </div>
          </div>
          {cartOpen && <CartDropdown />}
        </nav>
      </Container>
      

      <div className="vh-93"/>
      <Outlet />

      <div className={currentUser ? "side-nav" : "hidden"}>
        { authNav && 
          <AuthNav
            device_class={"drop"}
            isDisabled={isDisabled}
            isOpen={closeBtn}
            onClose={() => setAuthNav(!authNav)}
            onSignOut={handleSignOut}
          />
        }
      </div>

      { isBurger && 
        <>
          <div className="burger-close-btn" onClick={closeMenu}> 
            <CloseButton /> 
          </div> 
          <BurgerMenu 
            isOpen={isBurger} 
            onClose={closeMenu}
          />
        </> 
      } 
    </Fragment>
  )
}

export default MobileNavBar;
