/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { TbLicense, TbShoppingBagDiscount } from "react-icons/tb";
import { LuUser2, LuHelpCircle } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import { PiTextBBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [ close, setClose ] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setClose(true);
    }, 9999);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const handleNavDropPostRouting = () => {
    setClose(true);
  };

  return (
    <> 
    { close ? (
      <></>
      ) : (

      <nav className="nav nav-menu bg-dark">
        <div className="container-fluid">
          <div className="nav-burger">
            <div aria-labelledby="dropdownMenuLink">
              <ul>
                <Link 
                  className="menu-list dropdown-item" 
                  aria-current="page" to='shop'
                  onClick={handleNavDropPostRouting}
                  >
                  <TbShoppingBagDiscount className="ml-icon"/>
                  <span className="ml-title">Marketplace </span>
                </Link>

                <Link 
                  className="menu-list dropdown-item" 
                  aria-current="page" to='brands'
                  onClick={handleNavDropPostRouting}
                  >
                  <PiTextBBold className="ml-icon"/>
                  <span className="ml-title"><b>AF</b> Brands </span>
                </Link>

                <Link 
                  className="menu-list dropdown-item"
                  aria-current="page" to='profile'
                  onClick={handleNavDropPostRouting}
                  >
                  <LuUser2 className="ml-icon"/>
                  <span className="ml-title">My profile</span>
                </Link>

                <Link 
                  className="menu-list dropdown-item" 
                  aria-current="page" to='help'
                  onClick={handleNavDropPostRouting}
                  >
                  <LuHelpCircle className="ml-icon"/>
                  <span className="ml-title">Help desk</span>
                </Link>

                <Link 
                  className="menu-list dropdown-item -mb2" 
                  aria-current="page" to='credits'
                  onClick={handleNavDropPostRouting}
                  >
                  <TbLicense className="ml-icon"/>
                  <span className="ml-title">Credits</span>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
    </>
  )
}

export default BurgerMenu;