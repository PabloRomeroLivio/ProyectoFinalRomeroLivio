import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useProduct } from "./ProductContext"; 
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setProduct } = useProduct(); 

  useEffect(() => {
    if (id !== producto?.id) {
      const fetchData = async () => {
        setLoading(true);

        try {
          const docRef = doc(db, "productos", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const fetchedProducto = { id: docSnap.id, ...docSnap.data() };
            setProducto(fetchedProducto);
            setProduct(fetchedProducto); 
          } else {
            setProducto(null); 
          }
        } catch (error) {
          setProducto(null); 
        } finally {
          setLoading(false); 
        }
      };

      fetchData();
    }
  }, [id, setProduct, producto?.id]); 

  if (loading) {
    return <div className="text-center">Cargando detalles del producto...</div>;
  }

  if (!producto) {
    return <div className="text-center">Producto no encontrado</div>;
  }

  return <ItemDetail producto={producto} />;
};

export default ItemDetailContainer;
