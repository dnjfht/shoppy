import React from "react";
import ProductCard from "./ProductCard";

export default function BestProduct({ items }) {
  return (
    <div className="py-1 text-center">
      <h1 className="mb-10 font-semibold">Best Items</h1>

      <ul className="flex flex-wrap">
        {items.products
          .filter((item) => item.banner.includes("best"))
          .map((item, index) => {
            return <ProductCard item={item} key={item.id} index={index} />;
          })}
      </ul>
    </div>
  );
}
