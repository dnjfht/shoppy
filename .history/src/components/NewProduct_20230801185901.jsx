import React from "react";
import ProductCard from "./ProductCard";

export default function NewProduct({ items, index }) {
  return (
    <div className="py-10 text-center">
      <h1 className="mb-10 font-semibold">New Items</h1>

      <ul className="flex flex-wrap">
        {items.products
          .filter((item) => item.banner.includes("new"))
          .map((item) => {
            return <ProductCard item={item} key={item.id} />;
          })}
      </ul>
    </div>
  );
}
