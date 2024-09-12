/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import CartDropdown from "../../cartServices/cart-dropdown/mobile.cart-dropdown";
import CartIcon from "../../cartServices/cart-icon/cart-icon.components";
import { Container, Navbar, CloseButton } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import { SignOutUser } from "../../../utils/firebase.utils";
import { useAlert } from "../../../contexts/alert.context";
import { Fragment, useContext, useState } from "react";
import BurgerMenu from './nav-drop.mobile';
import { LuLogIn } from "react-icons/lu";
import NavUserBadge from "./user-badge";
import { SideNav } from "./auth-nav";

import './navbar.styles.scss'

const MobileNavBar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [ isBurger, setBurger ] = useState(false);
  const [ sideNav, setSideNav ] = useState(false);
  const [ closeBtn, setCloseBtn ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();

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

  const closeMenu =()=> setBurger(false);
  const toggleMenu =()=> setBurger(!isBurger);
  const toggleCart =()=> setCartOpen(!cartOpen);

  const autoCloseSideNav = () => {
    if (cartOpen) setCartOpen(false);
    setCloseBtn(!closeBtn);
    setSideNav(true);
  }

  const handleSignOut = () => {
    // nav-drop sign out flow
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

  const imageUrl = currentUser?.imageUrl || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

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
                {isBurger ? 
                  (<div className="btm-nav-close-btn">
                    <CloseButton />
                  </div>) : 
                  <div className="animated-icon1">                      
                    <span></span>
                    <span></span>    
                    <span></span>
                  </div>
                }
              </div>

              <div className="force-af-center"></div>
              <Navbar.Brand className="nav-brand">
                <Link to="/"> {/* Used as a global navigator to home :/ index */}
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
                    <span                       
                      onClick={autoCloseSideNav}>
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
          {sideNav && (
            <SideNav
              displayName={currentUser?.displayName}
              displayEmail={currentUser?.email}
              onClose={() => setSideNav(!sideNav)}
              onSignOut={handleSignOut}
              device_class={"drop"}
              isOpen={closeBtn}
            />
          )}
        </div>

      </Container>
      {isBurger && (
        <BurgerMenu 
          isOpen={isBurger} 
          onClose={closeMenu}
        />
      )} 
    </Fragment>
  )
}

export default MobileNavBar;