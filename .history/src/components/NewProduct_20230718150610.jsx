import React from "react";

export default function NewProduct({ items }) {
  return (
    <div>
      <h1>New Items</h1>

      <ul>
        {items.products.map((item) => {
          return <li></li>;
        })}
      </ul>
    </div>
  );
}
