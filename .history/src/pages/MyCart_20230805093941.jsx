import React from "react";
import { attach_won } from "./Main";
import { GoX } from "react-icons/go";
import { CiHeart, CiGift } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";

export default function MyCart({ cart, setCart }) {
  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  const freeDeliveryPercent = ((50000 - totalPrice) / 50000) * 100;
  console.log(totalPrice, freeDeliveryPercent);

  const progressBarStyle = {
    width: `${freeDeliveryPercent}%`,
  };

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
                            <td className="w-[10%] text-center">
                              <input
                                type="checkbox"
                                className="appearance-none w-5 h-5 border-[1px] border-solid border-[#ccc] rounded-none"
                              />
                            </td>
                            <td className="w-[20%]">
                              <img
                                className="w-[40%] mx-auto object-cover my-5"
                                src={process.env.PUBLIC_URL + `/../${c.image}`}
                                alt="product_img"
                              />
                            </td>
                            <td className="w-[20%] text-left text-[0.875rem]">
                              <p className=" text-[#333] font-semibold">
                                {c.title}
                              </p>
                              <p className="text-[#999]">{`[옵션: ${c.color}/${c.size}]`}</p>
                            </td>
                            <td className="w-[10%] text-center text-[0.875rem] text-[#333] font-semibold">
                              {attach_won(c.price * c.count)}
                            </td>

                            <td className="w-[10%]">
                              <div className="w-full mx-auto flex items border-[1px] border-solid border-[#cacaca] font-normal">
                                <button className="w-8 h-8 bg-[#cacaca] text-[0.875rem] flex justify-center items-center border-r-[1px] border-solid border-[#cacaca]">
                                  -
                                </button>
                                <p className="w-8 h-8 flex justify-center items-center text-[0.875rem]">
                                  {c.count}
                                </p>
                                <button className="w-8 h-8 bg-[#cacaca] text-[0.875rem] flex justify-center items-center border-l-[1px] border-solid border-[#cacaca]">
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="w-[10%] text-center text-[1rem]">
                              -
                            </td>
                            <td className="w-[10%] text-center text-[0.875rem] text-[#333]">
                              <p>
                                {totalCount < 50000
                                  ? attach_won(2500)
                                  : attach_won(0)}
                              </p>
                              <p>조건</p>
                            </td>
                            <td className="w-[10%] text-center text-[1.6rem]">
                              <button>
                                <CiHeart />
                              </button>
                              <button>
                                <GoX />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </>
                </table>
              </div>

              <div className="w-[26%]">
                <div className="w-full border-[1px] border-solid border-[#e5e5e5]">
                  {totalPrice < 50000 && (
                    <div className="w-full px-6 py-8 box-border border-b-[1px] border-solid border-[#e5e5e5]">
                      <div className="mb-3 flex justify-center items-center text-[1rem] text-[#333] font-semibold">
                        <p className="text-[0.9rem]">
                          <BsBox2 />
                        </p>
                        <p className="ml-1 tracking-tighter">
                          무료배송 5만원까지{" "}
                          <span className="text-[#f57778]">
                            {attach_won(50000 - totalPrice)}
                          </span>{" "}
                          남았습니다!
                        </p>
                      </div>

                      <div className="w-full h-[3px] bg-[#e5e5e5]">
                        <div
                          style={progressBarStyle}
                          className="h-full bg-[#f57778] transition-all duration-700"
                        />
                      </div>
                    </div>
                  )}
                  <div className="w-full p-7 box-border bg-[#f7f7f7]">
                    <div className="w-full mb-3 flex justify-between items-center">
                      <p className="text-[0.875rem] text-[#333]">총 상품금액</p>
                      <p className="text-[1rem] text-[#333] font-semibold">
                        {attach_won(totalPrice)}
                      </p>
                    </div>

                    <div className="w-full pb-6 border-b-[1px] border-solid border-[#282828] flex justify-between items-center">
                      <p className="text-[0.875rem] text-[#333]">총 배송비</p>
                      <p className="text-[1rem] text-[#333] font-semibold">
                        {totalPrice < 50000 ? attach_won(2500) : attach_won(0)}
                      </p>
                    </div>

                    <div className="w-full mt-6 flex justify-between items-center font-semibold">
                      <p className="text-[1rem] text-[#333] ">결제예정금액</p>
                      <p className="text-[1.5rem] text-[#f57778]">
                        {attach_won(
                          totalPrice + (totalPrice < 50000 ? 2500 : 0)
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-5 flex flex-col items-center">
                  <button className="w-full py-5 mb-3 box-border bg-[#282828] border-[1px] border-solid border-black text-white">
                    전체상품주문
                  </button>

                  <button className="w-full py-5 mb-3 border-[1px] border-solid border-black">
                    선택상품주문
                  </button>

                  <button className="w-full py-5 flex justify-center items-center border-[1px] border-solid border-black">
                    <p className="text-[1.6rem] text-[#ff5151]">
                      <CiGift />
                    </p>
                    <p className="ml-1">선물하기</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
