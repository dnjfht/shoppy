import React from "react";

export default function NewProduct({ items }) {
  return (
    <div>
      <h1>New Items</h1>

      <ul>
        {items.products
          .filter((item) => items.banner.includes("new"))
          .map((item) => {
            return (
              <li>
                <img
                  src={process.env.PUBLIC_URL + `${item.image}`}
                  alt="productsImg"
                />
              </li>
            );
          })}
      </ul>
    </div>
  );
}
