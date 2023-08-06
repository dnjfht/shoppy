import React, { useState, useEffect } from "react";
import { attach_won } from "./Main";
import { GoX } from "react-icons/go";
import { CiHeart, CiGift } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { loadCartServer } from "../api/firebase";

export default function MyCart({ user, allCarts, setAllCarts }) {
  // user 배열 구조 : [{userId, id, title, color, size, price, count]}]

  const getCart = async () => {
    let cart;
    if (user) {
      cart = await loadCartServer(user);
    } else {
      // 로컬 스토리지에서 불러오기
    }
    console.log(cart);
    setAllCarts(cart ?? []);
  };

  useEffect(() => {
    getCart();
  }, []);

  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setProducts(allCarts.map((cart) => ({ ...cart })));
  }, [allCarts]);

  const totalCount = allCarts.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = allCarts.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  const freeDeliveryPercent = (totalPrice / 50000) * 100;
  console.log(totalPrice, freeDeliveryPercent);

  const progressBarStyle = {
    width: `${freeDeliveryPercent}%`,
  };

  const deleteCart = (idx) => {
    setAllCarts((prevCart) => prevCart.filter((c) => c.id !== idx));
  };

  const handleMinusCount = (idx) => {
    setAllCarts((prevCart) =>
      prevCart.map((c) => {
        return c.id === idx && c.count > 0 ? { ...c, count: c.count - 1 } : c;
      })
    );
  };

  const handlePlusCount = (idx) => {
    setAllCarts((prevCart) =>
      prevCart.map((c) => {
        return c.id === idx ? { ...c, count: c.count + 1 } : c;
      })
    );
  };

  // 전체 체크 박스를 토글하는 함수
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(products.map((product) => product.id));
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 체크 박스를 토글하는 함수
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    }
  };

  // 선택된 데이터 삭제하는 함수
  const handleDelete = () => {
    // allCarts에서 선택된 상품들을 제거하여 새로운 배열을 생성합니다.
    const updatedCarts = allCarts.filter(
      (cart) => !selectedItems.includes(cart.id)
    );

    // allCarts와 products를 모두 업데이트합니다.
    setAllCarts(updatedCarts);
    setProducts(updatedCarts.map((cart) => ({ ...cart })));
    setSelectedItems([]);
    setSelectAll(false);
  };

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 pt-10">
        <h1 className="font-semibold text-[1.875rem] mb-16 text-center">
          Cart
        </h1>
        <div className="w-full py-14 border-t-[1px] border-solid border-[#333] flex justify-between items-start">
          {allCarts && allCarts.length < 1 && <p>장바구니가 비어 있습니다.</p>}

          {allCarts && user && allCarts.length > 0 && (
            <>
              <div className="w-[70%] ">
                <div className="w-full mb-4 flex items-center text-[#282828]">
                  <p>일반상품</p>
                  <p className="ml-1">{`(${allCarts.length})`}</p>
                </div>

                <table className="w-full border-t-[1px] border-solid border-[#282828] text-[0.875rem] text-[#333]">
                  <thead>
                    <tr className="w-full h-[40px] py-[20px] border-b-[1px] border-solid border-[#e5e5e5]">
                      <th className="w-[10%] py-[20px]">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="w-5 h-5"
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
                  </thead>

                  <tbody>
                    {allCarts &&
                      user &&
                      allCarts
                        ?.filter((cart) => {
                          return cart.userId === user.uid;
                        })
                        ?.map((cart) => {
                          return (
                            <tr className="w-full border-b-[1px] border-solid border-[#e5e5e5]">
                              <td className="w-[10%] text-center">
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(cart.id)}
                                  onChange={(e) =>
                                    handleCheckboxChange(e, cart.id)
                                  }
                                  className="w-5 h-5"
                                />
                              </td>
                              <td className="w-[20%]">
                                <img
                                  className="w-[40%] mx-auto object-cover my-5"
                                  src={
                                    process.env.PUBLIC_URL + `/../${cart.image}`
                                  }
                                  alt="product_img"
                                />
                              </td>
                              <td className="w-[20%] text-left text-[0.875rem]">
                                <p className=" text-[#333] font-semibold">
                                  {cart.title}
                                </p>
                                <p className="text-[#999]">{`[옵션: ${cart.color}/${cart.size}]`}</p>
                              </td>
                              <td className="w-[10%] text-center text-[0.875rem] text-[#333] font-semibold">
                                {attach_won(cart.price * cart.count)}
                              </td>

                              <td className="w-[10%]">
                                <div className="w-full mx-auto flex items border-[1px] border-solid border-[#cacaca] font-normal">
                                  <button
                                    onClick={() => handleMinusCount(cart.id)}
                                    className="w-8 h-8 text-[0.875rem] flex justify-center items-center border-r-[1px] border-solid border-[#cacaca]"
                                  >
                                    -
                                  </button>
                                  <p className="w-8 h-8 flex justify-center items-center text-[0.875rem]">
                                    {cart.count}
                                  </p>
                                  <button
                                    onClick={() => handlePlusCount(cart.id)}
                                    className="w-8 h-8 text-[0.875rem] flex justify-center items-center border-l-[1px] border-solid border-[#cacaca]"
                                  >
                                    +
                                  </button>
                                </div>
                              </td>
                              <td className="w-[10%] text-center text-[1rem]">
                                -
                              </td>
                              <td className="w-[10%] whitespace-pre-wrap text-center text-[0.875rem] text-[#333]">
                                <p>
                                  {totalPrice < 50000
                                    ? `${attach_won(2500)}\n\조건`
                                    : attach_won(0)}
                                </p>
                              </td>
                              <td className="w-[10%] text-center text-[1.6rem] text-[#333]">
                                <button>
                                  <CiHeart />
                                </button>
                                <button
                                  onClick={() => deleteCart(cart.id)}
                                  className="ml-2"
                                >
                                  <GoX />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>

                  <tfoot>
                    <tr className="w-full box-border border-b-[1px] border-solid border-[#e5e5e5] text-right">
                      <td className="p-3 text-[0.75rem] text-[#333]">
                        [기본배송]
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="w-full mt-7 flex justify-between items-center">
                  <button
                    onClick={handleDelete}
                    className="h-[35px] px-3 border-[1px] border-solid border-[#e5e5e5] flex justify-center items-center"
                  >
                    <p className="text-[0.875rem] text-[#333]">삭제하기</p>
                  </button>
                  <button
                    onClick={() => {
                      setAllCarts([]);
                    }}
                    className="h-[35px] px-3 border-[1px] border-solid border-[#e5e5e5] flex justify-center items-center"
                  >
                    <p className="text-[0.875rem] text-[#333]">
                      장바구니 비우기
                    </p>
                  </button>
                </div>
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
                      <div className="flex items-center">
                        <p className="text-[1rem] text-[#333] font-semibold">
                          {attach_won(totalPrice)}
                        </p>
                        <p className="text-[0.875rem]">{`(${totalCount}개)`}</p>
                      </div>
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
