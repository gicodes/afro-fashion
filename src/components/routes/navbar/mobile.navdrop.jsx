/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { LuBaggageClaim, LuDollarSign, LuHelpCircle } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [ close, setClose ] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // close the burger menu after 10 seconds
    const timeoutId = setTimeout(() => {
      setClose(true);
    }, 9999);

    // Clean up the timeout when the component unmounts or when a new route is clicked
    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const handleNavDropPostRouting = () => {
    // close the burger menu when a user clicks a link
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
                  <LuBaggageClaim className="ml-icon"/>
                  <span className="ml-title">Start shopping </span>
                </Link>

                <Link 
                  className="menu-list dropdown-item" 
                  aria-current="page" to='auth'
                  onClick={handleNavDropPostRouting}
                  >
                  <LuDollarSign className="ml-icon"/>
                  <span className="ml-title">Seller profile</span>
                </Link>

                <Link 
                  className="menu-list dropdown-item" 
                  aria-current="page" to='help'
                  onClick={handleNavDropPostRouting}
                  >
                  <LuHelpCircle className="ml-icon"/>
                  <span className="ml-title">Need help?</span>
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