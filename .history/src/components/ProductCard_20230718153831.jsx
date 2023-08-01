import React from "react";
import { shorteningStr } from "../pages/Main";

export default function ProductCard({ item }) {
  return (
    <li key={item.id}>
      <img src={process.env.PUBLIC_URL + `${item.image}`} alt="productsImg" />
      <p>{item.title}</p>
      <p>{shorteningStr(item.description, 30)}</p>
      <p>{item.price}</p>
      <p>{item.salePrice}</p>
    </li>
  );
}
