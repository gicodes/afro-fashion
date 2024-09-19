/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import CartDropdown from "../cartServices/cart-dropdown/cart-dropdown";
import CartIcon from "../cartServices/cart-icon/cart-icon.components";
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
import { SideNav } from "./auth-nav";
import './navbar.styles.scss'

const NavBarComponent = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [ sideNav, setSideNav ] = useState(false);
  const [ closeBtn, setCloseBtn ] = useState(false);
  const [ cartOpen, setCartOpen ] = useState(false);
  const { addAutoCloseAlert, addOptionsAlert } = useAlert();; 

  const authIconStyle = {backgroundColor: currentUser ? 'white' : 'yellow',};

  const toggleCart = () => setCartOpen(!cartOpen);

  const autoCloseSideNav = () => {
    if (cartOpen) setCartOpen(false);
    setCloseBtn(!closeBtn);
    setSideNav(true);
  }

  const handleSignOut = () => {
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

  const imageUrl = currentUser?.imageUrl || 
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

  return (
    <Fragment>
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

              <div title="Cart" 
                onClick={toggleCart}
              >
                <CartIcon/>
              </div>

              <div className="nav-tab" title="Help Desk">
                <Link className="nav-link" to='help'>
                  <TbHelpHexagonFilled size={24} color="darkslategrey"/>
                </Link>
              </div>

              <div className="nav-tab" title="Credits">
                <Link className="nav-link" to='credits'>
                  <GiOpenBook size={25} color="#1a1a1a"/> &nbsp; &nbsp;
                </Link>
              </div>

              <div className="rounded-circle auth-area" style={authIconStyle} title="Account">
                { currentUser ? (
                  <Link aria-current="page"
                    onClick={autoCloseSideNav}>
                    <NavUserBadge imageUrl={imageUrl}/>
                  </Link>
                  ) : (
                  <Link className="nav-link" aria-current="page" to='auth'>
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