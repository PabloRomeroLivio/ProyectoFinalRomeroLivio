import React, { useState } from "react";

const ItemCount = ({ stock, initial, setCantidad }) => {
  const [cantidad, setLocalCantidad] = useState(initial);

  const handleIncrement = () => {
    if (cantidad < stock) {
      setLocalCantidad(cantidad + 1);
      setCantidad(cantidad + 1); 
    }
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setLocalCantidad(cantidad - 1);
      setCantidad(cantidad - 1); 
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <button onClick={handleDecrement} className="btn btn-outline-secondary">-</button>
      <span className="mx-3">{cantidad}</span>
      <button onClick={handleIncrement} className="btn btn-outline-secondary">+</button>
    </div>
  );
};

export default ItemCount;
