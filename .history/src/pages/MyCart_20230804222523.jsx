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
        <div className="w-full py-14 border-t-[1px] border-solid border-[#333] flex justify-between items-start">
          {cart && cart.length < 1 && <p>장바구니가 비어 있습니다.</p>}

          {cart && cart.length > 0 && (
            <>
              <div className="w-[70%] ">
                <div className="w-full mb-4 flex items-center text-[#282828]">
                  <p>일반상품</p>
                  <p className="ml-1">{`(${cart.length})`}</p>
                </div>

                <table className="w-full border-t-[1px] border-solid border-[#282828]">
                  <tr className="w-full">
                    <th className="w-1/12 py-[20px]">
                      <input type="checkbox" />
                    </th>
                    <th className="w-3/12 py-[20px]">이미지</th>
                    <th className="py-[20px]">상품정보</th>
                    <th className="py-[20px]">판매가</th>
                    <th className="py-[20px]">수량</th>
                    <th className="py-[20px]">적립금</th>
                    <th className="py-[20px]">배송비</th>
                    <th className="py-[20px]">선택</th>
                  </tr>
                </table>
              </div>

              <div className="w-[26%] h-72 bg-red-400"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}