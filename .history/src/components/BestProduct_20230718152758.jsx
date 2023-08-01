import React from "react";
import ProductCard from "./ProductCard";

export default function BestProduct({ items }) {
  return (
    <div>
      <h1>Best Items</h1>

      <ul>
        {items.products
          .filter((item) => item.banner.includes("best"))
          .map((item) => {
            return <ProductCard item={item} />;
          })}
      </ul>
    </div>
  );
}
