import { createContext, useState, useEffect } from "react";

const addItem = (cartItems, productIn) => {

  // >> find existing item in cartItems array
  const existingItem =
    cartItems.find((item) =>
      item.id === productIn.id
    )

  // >> if existing item, return quantity +1
  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productIn.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }

  // >> return productIn - quantity x price -
  return [{ ...productIn, quantity: 1 }, ...cartItems,];
};

const removeItem = (cartItems, productOut) => {

  // >> find this item in cartItems array
  const thisItem =
    cartItems.find((cartItem) =>
      cartItem.id === productOut.id
    )

  // >> if this item = 1, remove with filter
  if (thisItem.quantity === 1) {
    return cartItems.filter((item) =>
      item.id !== productOut.id
    )
  }

  // >> if this item > 1, return the quantity - 1
  return cartItems.map((item) =>
    item.id === productOut.id && productOut.quantity !== 0
      ? { ...item, quantity: item.quantity - 1 }
      : item
  )
}


// CART CONTEXT: useContext plugins
export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => { },
  cartItems: [],
  addItemtoCart: () => { },
  removeItemfromCart: () => { },
  cartCount: 0,
});


// CART PROVIDER: ...value
export const CartProvider = ({ children }) => {

  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // live render new cart Count using useEffect
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount);
  }
    , [cartItems]);

  // useState to set cartItems with addItem function and productIn
  const addItemtoCart = (productIn) => {
    setCartItems(addItem(cartItems, productIn));
  };

  // useState to set cartItems with removeItem function and productIn
  const removeItemfromCart = (productOut) => {
    setCartItems(removeItem(cartItems, productOut));
  };

  const value = {
    cartCount,
    cartItems,
    isCartOpen,
    setCartOpen,
    addItemtoCart,
    removeItemfromCart,
  };

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
}