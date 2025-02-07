import React, { useState } from 'react';
import { useCart } from './CartContext'; 
import ItemCount from './ItemCount'; 
import { Link } from 'react-router-dom';  

const Item = ({ producto }) => {
  const { addToCart } = useCart(); 
  const [added, setAdded] = useState(false);
  const [cantidad, setCantidad] = useState(1); 

  const handleAddToCart = () => {
    if (producto.stock >= cantidad) {  
      addToCart({ ...producto, cantidad }); 
      setAdded(true); 
    } else {
      alert('No hay suficiente stock'); 
    }
  };

  const handleReset = () => {
    setCantidad(1); 
    setAdded(false); 
  };

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={producto.imagen ? `../imagenes/${producto.imagen}` : "/imagenes/default.jpg"} 
        className="card-img-top" 
        alt={producto.nombre} 
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-center">{producto.nombre}</h5>
        <p className="card-text text-center font-weight-bold">${producto.precio.toFixed(2)}</p>

        {!added ? (
          <ItemCount 
            stock={producto.stock} 
            initial={1} 
            setCantidad={setCantidad}  e
          />
        ) : (
          <>
            <p className="text-success text-center">¡Producto agregado al carrito!</p>
            <button 
              className="btn btn-success mt-2 mx-auto d-block"
              onClick={handleReset}
            >
              OK
            </button>
          </>
        )}


        {!added && (
          <div className="d-flex justify-content-center mt-2">
            <Link to={`/item/${producto.id}`} className="btn btn-outline-primary">
              Ver detalle
            </Link>
          </div>
        )}

        
        {!added && (
          <button
            onClick={handleAddToCart}
            className="btn btn-primary mt-3"
            disabled={producto.stock < cantidad} 
          >
            {producto.stock >= cantidad ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Item;
