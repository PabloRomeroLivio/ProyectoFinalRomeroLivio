import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const ProductContext = createContext();

// Crear el hook para usar el contexto
export const useProduct = () => {
  return useContext(ProductContext);
};

// Crear el proveedor del contexto
export const ProductProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Función para actualizar el producto seleccionado
  const setProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <ProductContext.Provider value={{ selectedProduct, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};