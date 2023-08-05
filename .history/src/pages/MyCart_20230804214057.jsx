import React from "react";
import { useLocation } from "react-router-dom";

export default function MyCart() {
  // const {
  //   state: { cart },
  // } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 pt-10 text-center">
        <h1 class="font-semibold text-[1.875rem] mb-10">Cart</h1>
        <div className="w-full mt-[60px] border-t-[1px] border-solid border-[#ccc]"></div>
      </div>
    </div>
  );
}
