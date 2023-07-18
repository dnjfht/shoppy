import React from "react";

export default function NewProduct() {
  return (
    <div>
      <h1>New Items</h1>

      {items && (
        <ul>
          {items.products.map((item) => {
            return (
              <li>
                <img
                  src={process.env.PUBLIC_URL + `${item.image}`}
                  alt="productImg"
                />
                <p>{item.title}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
