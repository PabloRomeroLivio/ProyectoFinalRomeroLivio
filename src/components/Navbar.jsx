import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import { useProduct } from './ProductContext'; 

const NavBar = () => {
  const { selectedProduct } = useProduct(); 

  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/categoria/rellenas">Rellenas</Link>
      <Link to="/categoria/sin-relleno">Sin Relleno</Link>
      {selectedProduct ? (
        <Link to={`/item/${selectedProduct.id}`}>Detalle de {selectedProduct.nombre}</Link>
      ) : (
        <Link to="/item/:id">Detalle de Producto</Link>
      )}

      <Link to="/cart">
        <CartWidget />
      </Link>
    </nav>
  );
};

export default NavBar;