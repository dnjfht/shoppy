import React from "react";

export default function MyCart({ cart, setCart }) {
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

                <table className="w-full border-t-[1px] border-solid border-[#282828] text-[0.875rem] text-[#333]">
                  <tr className="w-full h-[40px] py-[20px] border-b-[1px] border-solid border-[#e5e5e5]">
                    <th className="w-[10%] py-[20px]">
                      <input type="checkbox" className="w-4 h-4" />
                    </th>
                    <th className="w-[20%] py-[20px]">이미지</th>
                    <th className="w-[10%] py-[20px]">상품정보</th>
                    <th className="w-[10%] py-[20px]">판매가</th>
                    <th className="w-[10%] py-[20px]">수량</th>
                    <th className="w-[10%] py-[20px]">적립금</th>
                    <th className="w-[10%] py-[20px]">배송비</th>
                    <th className="w-[10%] py-[20px]">선택</th>
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
