import React, { useState } from 'react';

const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  totalamount: 0,
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  updateTotalAmount: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [totalamount, setTotalAmount] = useState(0);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const addCartItem = (item) => {
    setCartList([...cartList, item]);
  };

  const removeCartItem = (id) => {
    const updatedCart = cartList.filter((item) => item.id !== id);
    setCartList(updatedCart);
  };

  const incrementCartItemQuantity = (id) => {
    const updatedCart = cartList.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartList(updatedCart);
  };

  const decrementCartItemQuantity = (id) => {
    const updatedCart = cartList.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartList(updatedCart);
  };

  const updateTotalAmount = (amount) => {
    setTotalAmount(amount);
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        removeAllCartItems,
        totalamount,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        updateTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;