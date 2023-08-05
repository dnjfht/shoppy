import React from "react";
import { useLocation } from "react-router-dom";

export default function MyCart() {
  // const {
  //   state: { cart },
  // } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 py-10 text-center">
        <h1 class="my-10 font-semibold text-[1.875rem]">Cart</h1>
      </div>
    </div>
  );
}
