import React from "react";
import ProductCard from "./ProductCard";

export default function BestProduct({ items }) {
  return (
    <div className="py-10 text-center">
      <h1>Best Items</h1>

      <ul>
        {items.products
          .filter((item) => item.banner.includes("best"))
          .map((item, index) => {
            return <ProductCard item={item} key={item.id} index={index} />;
          })}
      </ul>
    </div>
  );
}
