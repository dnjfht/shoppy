import React from "react";
import { useLocation } from "react-router-dom";

export default function MyCart() {
  const {
    state: { cart },
  } = useLocation();
  console.log(cart);

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto">\</div>
    </div>
  );
}
