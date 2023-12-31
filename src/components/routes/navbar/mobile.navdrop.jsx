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
        <span className="ml-title">Start shopping </span>
      </Link>

      <Link className="menu-list dropdown-item" to='sell'>
        <LuDollarSign className="ml-icon"/>
        <span className="ml-title">Seller profile</span>
      </Link>

      <Link className="menu-list dropdown-item" to='help'>
        <LuHelpCircle className="ml-icon"/>
        <span className="ml-title">Need help</span>
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