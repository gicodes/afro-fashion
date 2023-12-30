import { LuBaggageClaim, LuDollarSign, LuHelpCircle } from "react-icons/lu";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  return (
  <>

<nav className="nav nav-menu bg-dark">

<div className="container-fluid">
<div className="nav-burger">
  <div aria-labelledby="dropdownMenuLink">
    <ul>
      <Link className="menu-list dropdown-item" aria-current="page" to='shop'>
        <LuBaggageClaim className="ml-icon"/>
        <span className="ml-title"><u>Shop</u></span>
      </Link>

      <Link className="menu-list dropdown-item" to='sell'>
        <LuDollarSign className="ml-icon"/>
        <span className="ml-title"><u>Sell</u></span>
      </Link>

      <Link className="menu-list dropdown-item" to='help'>
        <LuHelpCircle className="ml-icon"/>
        <span className="ml-title"><u>Need Help?</u></span>
      </Link>
    </ul>
  </div>
</div>
</div>
</nav>
</>
  )
}

export default BurgerMenu;