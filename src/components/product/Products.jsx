import React from "react";
import ProductCard from "./ProductCard";

export default function Products({ items }) {
  return (
    <div>
      <h1>Items</h1>

      <ul>
        {items.products.map((item) => {
          return <ProductCard item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}
