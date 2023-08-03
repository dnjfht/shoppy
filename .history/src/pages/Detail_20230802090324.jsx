import React from "react";
import { useLocation } from "react-router-dom";

export default function Detail() {
  const {
    state: { item },
  } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto py-56">
        <img
          src={process.env.PUBLIC_URL + `/../${item.image}`}
          alt="item_img"
        />
      </div>
    </div>
  );
}
