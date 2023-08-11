import React from "react";
import { useLocation } from "react-router-dom";

export default function MyCart() {
  // const {
  //   state: { cart },
  // } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 pt-10 text-center">
        <h1 class="font-semibold text-[1.875rem] mb-16">Cart</h1>
        <div className="w-full py-14 border-t-[1px] border-solid border-[#333]">
          <p>일반상품</p>
          <p>{cart.length}</p>
        </div>
      </div>
    </div>
  );
}