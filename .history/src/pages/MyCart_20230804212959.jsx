import React from "react";
import { useLocation } from "react-router-dom";

export default function MyCart() {
  // const {
  //   state: { cart },
  // } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32">
        <h1 class="my-10 font-semibold">Cart</h1>
      </div>
    </div>
  );
}