import React from "react";

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
            return (
              <li>
                <img
                  src={process.env.PUBLIC_URL + `${item.image}`}
                  alt="productsImg"
                />
                <p>{item.title}</p>
                <p>{shorteningStr(item.description, 30)}</p>
                <p>{item.price}</p>
                <p>{item.salePrice}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
