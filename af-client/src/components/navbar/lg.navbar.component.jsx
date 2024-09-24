/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import CartDropdown from "../cartServices/cart-dropdown/cart-dropdown";
import CartIcon from "../cartServices/cart-icon/cart-icon.components";
import { blankAvi } from "../routes/dashboard/index/dash-assets";
import { ReactComponent as Logo } from "../assets/afro-fa.svg";
import { React, useContext, useState , Fragment} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import { useAlert } from "../../contexts/alert.context";
import { SignOutUser } from "../../utils/firebase.utils";
import { TbHelpHexagonFilled } from "react-icons/tb";
import { FaUserLargeSlash } from "react-icons/fa6";
import { GiOpenBook } from "react-icons/gi";
import { FaShopify } from "react-icons/fa6";
import { MdSell } from "react-icons/md";
import { Navbar } from 'react-bootstrap';
import NavUserBadge from "./user-badge";
import { AuthNav } from "./auth-nav";

import './navbar.styles.scss'

const NavBarComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [ sideNav, setAuthNav ] = useState(false);
  const [ closeBtn, setCloseBtn ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();; 

  const authIconStyle = {backgroundColor: currentUser ? 'white' : 'yellow',};

  const toggleCart = () => setCartOpen(!cartOpen);

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
      <Outlet />
      <Navbar 
        fixed="bottom" 
        bg="light"
      >
        { cartOpen && <CartDropdown />}
        
        { AuthNav && (
          <div fixed="bottom" className="bottom-nav">
            <AuthNav
              device_class={"-lg"} 
              displayName={currentUser?.displayName}
              isDisabled={isDisabled}             
              isOpen={closeBtn}
              onClose={() => setAuthNav(!sideNav)}
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

              <div title="Cart" onClick={toggleCart}><CartIcon/></div>

              <div className="nav-tab" title="Help Desk">
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
                { currentUser ? (
                  <Link onClick={autoCloseAuthNav}>
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