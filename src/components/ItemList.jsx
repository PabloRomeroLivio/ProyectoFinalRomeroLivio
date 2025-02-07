import React from "react";
import { Link } from "react-router-dom";  
import Item from "./Item";

const ItemList = ({ productos }) => {
  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col">
            <Item producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;