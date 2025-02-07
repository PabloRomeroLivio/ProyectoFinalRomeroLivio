import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoria } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (categoria) {
          const productosFiltrados = productosArray.filter(
            (prod) => prod.categoria.trim().toLowerCase() === categoria.trim().toLowerCase()
          );
          setProductos(productosFiltrados);
        } else {
          setProductos(productosArray);
        }
      } catch (error) {
        console.error("Error obteniendo productos:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [categoria]);

  return (
    <div style={{ padding: "10px" }}>
      <h2>{categoria ? `Categoría: ${categoria.replace("-", " ")}` : greeting}</h2>
      {loading ? <p>Cargando productos...</p> : <ItemList productos={productos} />}
    </div>
  );
};

export default ItemListContainer;
