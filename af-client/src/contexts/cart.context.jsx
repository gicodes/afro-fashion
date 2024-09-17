import { createContext, useState, useEffect } from "react";

const addItem = (cartItems, productIn) => {
  const existingItem = cartItems.find((item) => item.id === productIn.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productIn.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [{ ...productIn, quantity: 1 }, ...cartItems];
};

const removeItem = (cartItems, productOut) => {
  const thisItem = cartItems.find((cartItem) => cartItem.id === productOut.id);

  if (thisItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== productOut.id);
  }
  return cartItems.map((item) =>
    item.id === productOut.id && productOut.quantity !== 0
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};

// CART CONTEXT: useContext plugins
export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemtoCart: () => {},
  removeItemfromCart: () => {},
  cartCount: 0,
});

// CART PROVIDER: using localStorage to persist cart state
export const CartProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemtoCart = (productIn) => {
    setCartItems(addItem(cartItems, productIn));
  };

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

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}