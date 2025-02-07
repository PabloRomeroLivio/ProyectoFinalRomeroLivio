import React from "react";
import { FaShoppingCart } from "react-icons/fa";  // Importa el ícono del carrito
import { useCart } from './CartContext'; 

const CartWidget = () => {
  const { cart } = useCart(); 

  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <div className="cart-widget">
      <FaShoppingCart size={24} /> {/* Ícono del carrito */}
      {totalItems > 0 && <span className="cart-quantity">{totalItems}</span>} {/* Muestra la cantidad si hay productos */}
    </div>
  );
};

export default CartWidget;
