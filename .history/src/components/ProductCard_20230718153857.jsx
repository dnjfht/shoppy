import React from "react";

export default function ProductCard({ item }) {
  return (
    <li>
      <img src={process.env.PUBLIC_URL + `${item.image}`} alt="productsImg" />
      <p>{item.title}</p>
      <p>{shorteningStr(item.description, 30)}</p>
      <p>{item.price}</p>
      <p>{item.salePrice}</p>
    </li>
  );
}
