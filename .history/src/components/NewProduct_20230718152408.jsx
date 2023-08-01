import React from "react";
import ProductCard from "./ProductCard";

const shorteningStr = (comment, num) => {
  return comment.slice(0, num) + "...";
};

export default function NewProduct({ items }) {
  return (
    <div>
      <h1>New Items</h1>

      <ul>
        {items.products
          .filter((item) => item.banner.includes("new"))
          .map((item) => {
            return <ProductCard item={item} />;
          })}
      </ul>
    </div>
  );
}
