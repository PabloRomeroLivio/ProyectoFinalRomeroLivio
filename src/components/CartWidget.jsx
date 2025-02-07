import React from "react";

import { useCart } from './CartContext'; 

const CartWidget = () => {
  const { cart } = useCart(); 


  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="cart-widget">
      <span>{totalItems}</span> 
      <img src="carrito-icono.png" alt="Carrito" />
    </div>
  );
};

export default CartWidget;