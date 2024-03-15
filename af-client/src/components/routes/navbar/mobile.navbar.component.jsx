import CartDropdown from "../../cartServices/cart-dropdown/mobile.cart-dropdown";
import CartIcon from "../../cartServices/cart-icon/cart-icon.components";
import { Container, Navbar, CloseButton } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import { SignOutUser } from "../../../utils/firebase.utils";
import { useAlert } from "../../../contexts/alert.context";
import { Fragment, useContext, useState } from "react";
import { LuLogIn, LuUserCheck } from "react-icons/lu";
import BurgerMenu from './nav-drop.mobile';
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

  return (
    <Fragment>
      <Container className="container no-padding-container">
        <nav className="nav bg-gw">

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
                      onClick={autoCloseSideNav}>
                      <LuUserCheck color="white"/>                       
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
        <Outlet />

        <div className={currentUser ? "side-nav" : "dis-non"}>
          {sideNav && (
            <SideNav
              displayName={currentUser?.displayName}
              onClose={() => setSideNav(!sideNav)}
              onSignOut={handleSignOut}
              device_class={"drop"}
              isOpen={closeBtn}
            />
          )}
        </div>

      </Container>
      {isBurger && <BurgerMenu closeMenu={closeMenu}/>} 

    </Fragment>
  )
}

export default MobileNavBar;