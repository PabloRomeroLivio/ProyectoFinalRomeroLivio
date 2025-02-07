import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config"; 
import productos from "../data/data"; 

const uploadProducts = async () => {
  try {
    const productosRef = collection(db, "productos"); 

    for (const producto of productos) {
      await addDoc(productosRef, producto); 
    }

    console.log("Productos cargados correctamente");
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

export default uploadProducts;
