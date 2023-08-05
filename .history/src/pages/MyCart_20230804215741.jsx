import React from "react";
import { useLocation } from "react-router-dom";

export default function MyCart({ cart, setCart }) {
  // const {
  //   state: { cart },
  // } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 pt-10 text-center">
        <h1 class="font-semibold text-[1.875rem] mb-16">Cart</h1>
        <div className="w-full py-14 border-t-[1px] border-solid border-[#333]">
          {cart && cart.length < 1 && <p>장바구니가 비어 있습니다.</p>}

          {cart && cart.length > 0 && (
            <>
              <div className="flex items-center">
                <p>일반상품</p>
                <p className="ml-1">{`(${cart.length})`}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
