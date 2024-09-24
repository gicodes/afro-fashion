/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import CartDropdown from "../cartServices/cart-dropdown/mobile.cart-dropdown";
import CartIcon from "../cartServices/cart-icon/cart-icon.components";
import { blankAvi } from "../routes/dashboard/index/dash-assets";
import { Container, Navbar, CloseButton } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { SignOutUser } from "../../utils/firebase.utils";
import { useAlert } from "../../contexts/alert.context";
import { Fragment, useContext, useState } from "react";
import BurgerMenu from './nav-drop.mobile';
import { LuLogIn } from "react-icons/lu";
import NavUserBadge from "./user-badge";
import { AuthNav } from "./auth-nav";

import './navbar.styles.scss'

const MobileNavBar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [ isBurger, setBurger ] = useState(false);
  const [ authNav, setAuthNav ] = useState(false);
  const [ closeBtn, setCloseBtn ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();

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

  const closeMenu =()=> setBurger(false);
  const toggleMenu =()=> setBurger(!isBurger);
  const toggleCart =()=> setCartOpen(!cartOpen);

  const autoCloseAuthNav = () => {
    if (cartOpen) setCartOpen(false);
    setCloseBtn(!closeBtn);
    setAuthNav(true);
  }

  const handleSignOut = () => {
    const handleYes = () => {
      SignOutUser(); // sign out user
      addAutoCloseAlert("success", `You are now signed out! see you soon  🤗`) // success action
      navigate('/auth') // redirect to sign-in page
      setAuthNav(false); // close auth-nav bar
      setIsDisabled(false); // enable * nav bar
    }

    const handleNo = () => {
      addAutoCloseAlert("warning", `Sign out operation cancelled!`)
      setIsDisabled(false);
      setAuthNav(false); 
    };
    
    setIsDisabled(true); // Disable all components
    addOptionsAlert('warning', 'Are you signing out?', handleYes, handleNo);
  }   
  
  const imageUrl = currentUser?.imageUrl || blankAvi;

  return (
    <Fragment>
      <Container className="container no-padding-container">
        <nav className="nav bg-gw-bb fixed"> 
          <div className="container-fluid">
            <div className="nav-burger">
              <div
                type="button" 
                onClick={toggleMenu}
                className="open-close-nav"
              >
                { isBurger ? 
                  <div className="btm-nav-close-btn"><CloseButton /></div> 
                  : 
                  <div className="animated-icon1">                      
                    <span />
                    <span />    
                    <span />
                  </div>
                }
              </div>

              <div className="force-af-center" />
              <Navbar.Brand className="v-center nav-brand">
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
                      onClick={autoCloseAuthNav}>
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

        <div className="vh-93"/>
        <Outlet />

        <div className={currentUser ? "side-nav" : "hidden"}>
          { AuthNav && 
            <AuthNav
              device_class={"drop"}
              displayName={currentUser?.displayName}
              displayEmail={currentUser?.email}
              isDisabled={isDisabled}
              isOpen={closeBtn}
              onClose={() => setAuthNav(!authNav)}
              onSignOut={handleSignOut}
            />
          }
        </div>
      </Container>

      { isBurger &&
        <BurgerMenu 
          isOpen={isBurger} 
          onClose={closeMenu}
        /> } 
    </Fragment>
  )
}

export default MobileNavBar;