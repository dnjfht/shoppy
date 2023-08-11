import React from "react";
import { attach_won } from "./Main";

export default function MyCart({ cart, setCart }) {
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 pt-10">
        <h1 class="font-semibold text-[1.875rem] mb-16 text-center">Cart</h1>
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
                      <input
                        type="checkbox"
                        className="appearance-none w-5 h-5 border-[1px] border-solid border-[#ccc] rounded-none"
                      />
                    </th>
                    <th className="w-[20%]">이미지</th>
                    <th className="w-[20%]">상품정보</th>
                    <th className="w-[10%]">판매가</th>
                    <th className="w-[10%]">수량</th>
                    <th className="w-[10%]">적립금</th>
                    <th className="w-[10%]">배송비</th>
                    <th className="w-[10%]">선택</th>
                  </tr>

                  <>
                    {cart &&
                      cart?.map((c) => {
                        return (
                          <tr className="w-full border-b-[1px] border-solid border-[#e5e5e5]">
                            <td className="w-[10%]">
                              <input
                                type="checkbox"
                                className="appearance-none w-5 h-5 border-[1px] border-solid border-[#ccc] rounded-none"
                              />
                            </td>
                            <td className="w-[20%]">
                              <img
                                className="w-[40%] object-cover my-5"
                                src={process.env.PUBLIC_URL + `/../${c.image}`}
                                alt="product_img"
                              />
                            </td>
                            <td>{c.title}</td>
                            <td>{attach_won(c.price * c.count)}</td>
                            <td>{c.count}</td>
                            <td>-</td>
                            <td></td>
                            <td></td>
                          </tr>
                        );
                      })}
                  </>
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