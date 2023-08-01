import React from "react";
import ProductCard from "./ProductCard";

export default function NewProduct({ items }) {
  return (
    <div>
      <h1>New Items</h1>

      <ul>
        {items.products
          .filter((item) => item.banner.includes("new"))
          .map((item) => {
            return <ProductCard item={item} key={item.id} />;
          })}
      </ul>
    </div>
  );
}
