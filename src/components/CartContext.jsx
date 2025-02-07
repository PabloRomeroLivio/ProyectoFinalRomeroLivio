import React, { createContext, useState, useContext } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 


  const addToCart = (producto) => {
    setCart((prevCart) => {
      
      const existingProduct = prevCart.find(item => item.id === producto.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + producto.cantidad }  
            : item
        );
      }
      return [...prevCart, { ...producto, cantidad: producto.cantidad }];
    });
  };
  

  
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  
  const updateQuantity = (id, cantidad) => {
    setCart((prevCart) =>
      prevCart.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };


  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);