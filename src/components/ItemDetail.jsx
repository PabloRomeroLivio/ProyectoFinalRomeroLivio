import React, { useState } from "react";
import ItemCount from "./ItemCount";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom"; 

const ItemDetail = ({ producto }) => {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1); 
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(""); 

  const handleAddToCart = () => {
    if (cantidad <= producto.stock) {
      addToCart({ ...producto, cantidad });
      setAdded(true);
      setError(""); 
    } else {
      setError("No hay suficiente stock"); 
    }
  };

  return (
    <div className="card p-3 shadow-sm" style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 className="text-center">{producto.nombre}</h2>
      <p className="text-center fw-bold">Precio: ${producto.precio.toFixed(2)}</p>
      <p className="text-center">Stock: {producto.stock}</p>

      
      <img 
        src={producto.imagen ? `../imagenes/${producto.imagen}` : "/imagenes/default.jpg"} 
        className="card-img-top" 
        alt={producto.nombre} 
        style={{ objectFit: 'cover', height: '300px' }}
      />

     
      <div className="product-details">
        <p><strong>Categoría:</strong> {producto.categoria.replace("-", " ")}</p>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {!added && producto.stock > 0 ? (
        <>
          <ItemCount stock={producto.stock} initial={1} setCantidad={setCantidad} />
          <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Agregar al carrito
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-success text-center">¡Producto agregado al carrito!</p>
          <div className="d-flex justify-content-center mt-3">
            <Link to="/" className="btn btn-success">
              Volver al Inicio
            </Link>
          </div>
        </>
      )}

      {producto.stock === 0 && <p className="text-danger text-center">Producto sin stock</p>}
    </div>
  );
};

export default ItemDetail;