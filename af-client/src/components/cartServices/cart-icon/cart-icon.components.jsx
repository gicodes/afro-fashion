import './cart-icon.styles.scss';
import { useContext, useState, useEffect } from "react";
import { CartContext } from '../../../contexts/cart.context';
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-cart.svg";


const CartIcon = () => {
  const [ prevCartCount, setPrevCartCount ] = useState(0);
  const [ cartClass, setCartClass ] = useState("shopping-icon");
  const { isCartOpen, setCartOpen, cartCount } = useContext(CartContext)
  
  useEffect(() => {
    if (cartCount !== prevCartCount) {
      setCartClass("shopping-icon expand");
      setTimeout(() => {
        setCartClass("shopping-icon");
      }, 1000);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  const toggleCartOpen = () => setCartOpen(!isCartOpen);

  return (
    <div className="cart-icon-container">
      <ShoppingIcon className={cartClass} onClick={toggleCartOpen} />
      <span className="item-count">{cartCount}</span>
    </div>
  )
}

export default CartIcon;