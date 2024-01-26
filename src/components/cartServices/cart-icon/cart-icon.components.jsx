import './cart-icon.styles.scss';
import { useContext } from "react";
import { CartContext } from '../../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";


const CartIcon = () => {

  const { isCartOpen, setCartOpen, cartCount } = useContext(CartContext)

  const toggleCartOpen = () => setCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon fill='wheat' className="shopping-icon" onClick={toggleCartOpen} />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;