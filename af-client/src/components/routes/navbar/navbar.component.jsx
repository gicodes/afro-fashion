/* This is a Large-viewport Component. Designed to render on larger devices or screen sizes */

import CartDropdown from "../../cartServices/cart-dropdown/cart-dropdown";
import CartIcon from "../../cartServices/cart-icon/cart-icon.components";
import { ReactComponent as Logo } from "../../assets/afro-fa.svg";
import { React, useContext, useState , Fragment} from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/user.context";
import { SignOutUser } from "../../../utils/firebase.utils";
import { useAlert } from "../../../contexts/alert.context";
import { Navbar, Container } from 'react-bootstrap';
import { TbUserExclamation } from "react-icons/tb";
import { HiSpeakerphone } from "react-icons/hi";
import { FcBusinessman } from "react-icons/fc";
import { GrHelpBook } from "react-icons/gr";
import { FaShopify } from "react-icons/fa6";
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

  const authIconStyle = {backgroundColor: currentUser ? 'white' : 'yellow'};

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

  const imageUrl = currentUser?.imageUrl || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="

  return (
    <Fragment>
      <Container className="no-padding-container">
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
                      <FaShopify size={24} color="black"/>
                    </span>
                  </Link>
                </li>

                <li className="nav-item" title="Brands">
                  <Link className="nav-link" to='brands'>
                    <FcBusinessman size={24} color="black"/> 
                  </Link>
                </li>

                <li className="nav-item" title="Cart" 
                  onClick={toggleCart}
                >
                  <span><CartIcon/></span>
                </li>

                <li className="nav-item" title="Credits">
                  <Link className="nav-link" to='credits'>
                   &nbsp; <HiSpeakerphone size={22} color="darkgray"/> 
                  </Link>
                </li>

                <li className="nav-item" title="Help Desk">
                  <Link className="nav-link" to='help'>
                    <GrHelpBook size={21} color="#FEBE10"/> &nbsp;
                  </Link>
                </li>

                <li className="nav-item" style={authIconStyle} title="Account">
                 {
                  currentUser ? (
                    <Link aria-current="page"
                      onClick={autoCloseSideNav}>
                      <NavUserBadge imageUrl={imageUrl}/>
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