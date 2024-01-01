/* This is a Mobile first Component. Designed to render on mobile devices and smaller screen sizes */

import { LuBaggageClaim, LuDollarSign, LuHelpCircle } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [ close, setClose ] = useState(false);

  useEffect(() => {
  // close the burger menu after 10 seconds
    setTimeout(() => {
      setClose(true);
    }, 10000);
  })

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
                <Link className="menu-list dropdown-item" aria-current="page" to='shop'>
                  <LuBaggageClaim className="ml-icon"/>
                  <span className="ml-title">Start shopping </span>
                </Link>

                <Link className="menu-list dropdown-item" to='auth'>
                  <LuDollarSign className="ml-icon"/>
                  <span className="ml-title">Seller profile</span>
                </Link>

                <Link className="menu-list dropdown-item" to='help'>
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