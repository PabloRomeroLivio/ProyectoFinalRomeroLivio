import React, { useState } from 'react';
import { useCart } from './CartContext';
import { db } from '../firebase-config';
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

const CheckoutForm = () => {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({ nombre: '', email: '', direccion: '' });
  const [error, setError] = useState('');
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [ordenId, setOrdenId] = useState(null);
  const [detalleCompra, setDetalleCompra] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateStock = async (productoId, cantidadComprada) => {
    const productoRef = doc(db, "productos", productoId);
    
    try {
      const productoDoc = await getDoc(productoRef);
      if (productoDoc.exists()) {
        const productoData = productoDoc.data();
        const stockActual = productoData.stock;

        
        if (stockActual >= cantidadComprada) {
          const nuevoStock = stockActual - cantidadComprada;
          await updateDoc(productoRef, { stock: nuevoStock });
          return true;
        } else {
          return false; 
        }
      } else {
        console.log("Producto no encontrado");
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.direccion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    
    let stockSuficiente = true;
    for (const item of cart) {
      const esStockValido = await updateStock(item.id, item.cantidad);
      if (!esStockValido) {
        stockSuficiente = false;
        break;
      }
    }

    if (!stockSuficiente) {
      setError('No hay suficiente stock para completar tu compra.');
      return;
    }

    
    const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const order = {
      comprador: formData,
      productos: cart,
      total,
      fecha: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrdenId(docRef.id);
      setDetalleCompra(cart);
      setTotalCompra(total);
      clearCart();
      setCompraFinalizada(true);
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      setError('Hubo un problema al procesar tu compra. Intenta nuevamente.');
    }
  };

  if (compraFinalizada) {
    return (
      <div>
        <h2>¡Gracias por tu compra, {formData.nombre}! 🎉</h2>
        <h3>Orden N°: {ordenId}</h3>
        <h3>Resumen del Pedido:</h3>
        <ul>
          {detalleCompra.map((item, index) => (
            <li key={index}>
              {item.nombre} - {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
            </li>
          ))}
        </ul>
        <h3>Total: ${totalCompra}</h3>
        <h3>Datos del comprador:</h3>
        <p><strong>Nombre:</strong> {formData.nombre}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Dirección:</strong> {formData.direccion}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Finalizar Compra</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Confirmar Compra</button>
      </form>
    </div>
  );
};

export default CheckoutForm;