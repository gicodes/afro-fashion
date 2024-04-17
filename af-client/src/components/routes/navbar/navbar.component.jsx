/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import { TbUserExclamation, TbLicense, TbShoppingBagDiscount, TbUserCheck } from "react-icons/tb";
import CartDropdown from "../../cartServices/cart-dropdown/cart-dropdown";
import CartIcon from "../../cartServices/cart-icon/cart-icon.components";
import { ReactComponent as Logo } from "../../assets/afro-fa.svg";
import { React, useContext, useState , Fragment} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import { SignOutUser } from "../../../utils/firebase.utils";
import { useAlert } from "../../../contexts/alert.context";
import { Navbar, Container } from 'react-bootstrap';
import { LuHelpCircle } from "react-icons/lu";
import { PiTextBBold } from "react-icons/pi";
import { SideNav } from "./auth-nav";

import './navbar.styles.scss'

const NavBarComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [ sideNav, setSideNav ] = useState(false);
  const [ closeBtn, setCloseBtn ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();; 

  const authIconStyle = {
    backgroundColor: currentUser ? 'white' : 'yellow'
  }

  const toggleCart = () => setCartOpen(!cartOpen);

  const autoCloseSideNav = () => {
    if (cartOpen) setCartOpen(false);
    setCloseBtn(!closeBtn);
    setSideNav(true);
  }

  const handleSignOut = () => {
    // navbar sign out flow
    const handleYes = () => {
      SignOutUser();
      setSideNav(false);
      addAutoCloseAlert("success", `You are now signed out! see you soon  🤗`)
      navigate('/auth')
    };

    const handleNo = () => {
      setSideNav(false);
      addAutoCloseAlert("warning", `Sign out operation cancelled!`)
    };
    
    addOptionsAlert(
      'warning', 'Are you signing out?',
      handleYes, handleNo
    );
  }  

  return (
    <Fragment>
      <Container className="container no-padding-container">

        <Outlet />
        <Navbar fixed="bottom" bg="light">
          {cartOpen && <CartDropdown />}
          
          {sideNav && (
            <div fixed="bottom" className="bottom-nav">
              <SideNav
                displayName={currentUser?.displayName}
                onClose={() => setSideNav(!sideNav)}
                onSignOut={handleSignOut}
                device_class={"-lg"}                
                isOpen={closeBtn}
              />
            </div>
          )}

          <nav className="navbar bottom">
            <div className="container-fluid">
              <Link className="navigation logo" to='/'>
                <Logo/>
              </Link>

              <div></div>
              <Navbar.Brand href="/" className="nav-brand v-center shake">
                <h1 className="-mt2">
                  <span className="green">A</span><span>fro</span>
                  &nbsp;
                  <span className="green">F</span><span>ash</span><span className="green">ion</span>
                </h1>
              </Navbar.Brand>

              <ul className="nav nav-tabs justify-content-end">
                <li className="nav-item" title="Marketplace">
                  <Link className="nav-link" to='marketplace'>
                    <span className="nav-title">
                      <TbShoppingBagDiscount size={22} color="black"/>
                    </span>
                  </Link>
                </li>

                <li className="nav-item" title="Brands">
                  <Link className="nav-link" to='brands'>
                    <PiTextBBold size={23} color="black"/> 
                  </Link>
                </li>

                <li onClick={toggleCart} className="nav-item" title="Cart">
                  <span><CartIcon/></span>
                </li>

                <li className="nav-item" title="Help Desk">
                  <Link className="nav-link" to='help'>
                    &nbsp;<LuHelpCircle size={22} color="black"/>
                  </Link>
                </li>

                <li className="nav-item" title="Credits">
                  <Link className="nav-link" to='credits'>
                    <TbLicense size={22} color="black"/> &nbsp; &nbsp; 
                  </Link>
                </li>

                <li className="nav-item" style={authIconStyle} title="Profile">
                 {
                  currentUser ? (
                    <Link className="nav-link active" aria-current="page"
                      onClick={autoCloseSideNav}>
                      <TbUserCheck color="green" filled="black"/>
                    </Link>
                    ) : (
                    <Link className="nav-link" aria-current="page" to='auth'>
                      <TbUserExclamation fill="gray"/> 
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </nav>
          
        </Navbar>
      </Container>
    </Fragment>
  )
}

export default NavBarComponent;