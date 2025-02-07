import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="card p-4 text-center">
          <h2>Tu carrito está vacío</h2>
          <Link to="/" className="btn btn-primary mt-3">Volver a la tienda</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="card p-4" style={{ width: '50%' }}>
        <h2 className="text-center mb-4">Carrito de Compras</h2>
        <ul className="list-group mb-3">
          {cart.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.nombre}</strong> - {item.cantidad} x ${item.precio}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <h3 className="text-center">Total: ${cart.reduce((total, item) => total + item.precio * item.cantidad, 0)}</h3>
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-warning" onClick={clearCart}>Vaciar Carrito</button>
          <Link to="/checkout" className="btn btn-success">Ir al Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
