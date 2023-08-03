import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const {
    state: { item },
  } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto pt-52 pb-20 flex">
        <img
          src={process.env.PUBLIC_URL + `/../${item.image}`}
          alt="item_img"
        />

        <div>
          <p>{item.title}</p>
          <p>{item.price}</p>
          <p>{item.salePrice}</p>
        </div>
      </div>
    </div>
  );
}
