import React from "react";
import products from "../data/dummy";

const listItems = products.map((product) => (
  <li key={product.id}>{product.title}</li>
));

function Gallery() {
  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}
export default Gallery;
