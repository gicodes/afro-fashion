/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import CartDropdown from "../components/cartServices/cart-dropdown/cart-dropdown.tsx";
import CartIcon from "../components/cartServices/cart-icon/cart-icon.components.tsx";
import { ReactComponent as Logo } from "../components/assets/afro-fashion.svg";
import React, { useEffect, useContext, useState , Fragment} from "react";
import { blankAvi } from "../routes/dashboard/index/dash-assets.tsx";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAlert } from "../contexts/alert.context.tsx";
import { UserContext } from "../contexts/user.context.tsx";
import { SignOutUser } from '../utils/firebase.utils.ts';
import { TbHelpHexagonFilled } from "react-icons/tb";
import { FaUserLargeSlash } from "react-icons/fa6";
import { GiOpenBook } from "react-icons/gi";
import { FaShopify } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { Navbar } from 'react-bootstrap';
import NavUserBadge from "./user-badge.tsx";
import { AuthNav } from "./auth-nav.tsx";

import './navbar.styles.scss'

const NavBarComponent = () => {
  const navigate = useNavigate();
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

  const authIconStyle = { backgroundColor: currentUser ? 'white' : 'yellow' };
  const toggleCart = () => setCartOpen(!cartOpen);

  const autoCloseNavOps = () => {
    if (cartOpen) setCartOpen(false);
    setCloseBtn(!closeBtn);
    setAuthNav(true);
  };

  const handleSignOut = () => {
    const handleYes = () => {
      setIsDisabled(false); // enable * nav bar(s)
      setSigningOut(true);
      SignOutUser();

      addAutoCloseAlert("success", `You are now signed out! See you soon 🤗`);
      navigate('/auth'); 
      setAuthNav(false);
    };

    const handleNo = () => {
      addAutoCloseAlert("warning", `Sign out operation cancelled!`);
      setIsDisabled(false);
      setAuthNav(false);
    };

    setIsDisabled(true); // Disable all components
    addOptionsAlert('warning', 'Are you sure you want to sign out?', handleYes, handleNo);
  };
  
  const imageUrl = currentUser?.imageUrl || blankAvi;
  
  return (
    <Fragment>
      <Outlet />

      <Navbar 
        fixed="bottom" 
        bg="light"
      >
        { cartOpen && <CartDropdown />}
        { authNav && (
          // copilot suggests to remove <div fixed="" />
          <div className="bottom-nav">
            <AuthNav
              device_class={"-lg"} 
              isDisabled={isDisabled}             
              isOpen={closeBtn}
              onClose={() => setAuthNav(!authNav)}
              onSignOut={handleSignOut}  
            />
          </div>
        )}

        <nav className={isDisabled ? "disabled navbar bottom" : "navbar bottom"}>
          <div className="container-fluid">
            <Link className="navigation logo" to='/'>
              <Logo/>
            </Link>

            <Navbar.Brand href="/" className="nav-brand shake">
              <h1>
                <span className="green">A</span><span>fro</span>
                <span className="green">F</span><span>ash</span><span className="green">ion</span>
              </h1>
            </Navbar.Brand>

            <div className="flex justify-content-end">
              <div className="nav-tab" title="Marketplace">
                <Link className="nav-link" to='marketplace'>
                  <span className="nav-title">
                    <FaShopify size={24} color="black"/>
                  </span>
                </Link>
              </div>

              <div className="nav-tab" title="Brands">
                <Link className="nav-link" to='brands'>
                  <MdSell size={24} color="darkslategrey"/> 
                </Link>
              </div>

              <div title="Cart" onClick={toggleCart}>
                <CartIcon/>
              </div>

              <div className="nav-tab" title="Support">
                <Link className="nav-link" to='help'>
                  <TbHelpHexagonFilled size={24} color="darkslategrey"/>
                </Link>
              </div>

              <div className="nav-tab" title="Credits">
                <Link className="nav-link" to='credits'>
                  <GiOpenBook size={25} color="#1a1a1a" /> &nbsp;
                </Link>
              </div>

              <div 
                className="rounded-circle auth-area" 
                style={authIconStyle} 
                title="Account"
              >
                { currentUser && !signingOut ? (
                  <Link onClick={autoCloseNavOps} to={"#"}>
                    <NavUserBadge imageUrl={imageUrl}/>
                  </Link>
                  ) : (
                  <Link className="nav-link" to='auth'>
                    <FaUserLargeSlash fill="gray"/> 
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </Navbar>
    </Fragment>
  )
}

export default NavBarComponent;