import { useState, useEffect } from "react";
import { attach_won } from "../constants/constants";
import { setCartServer } from "../api/cart";

import Button from "../components/button/Button";
import CheckboxInput from "../components/input/CheckboxInput";

import { GoX } from "react-icons/go";
import { CiHeart, CiGift } from "react-icons/ci";
import FreeShippingCount from "../components/MyCart/FreeShippingCount";
import CartTotalPrice from "../components/MyCart/CartTotalPrice";

export default function MyCart({
  user,
  allCarts,
  setAllCarts,
  nonMemberAllCarts,
  setNonMemberAllCarts,
}) {
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setProducts(allCarts?.map((cart) => ({ ...cart })));
  }, [allCarts]);

  // 총 가격 / 총 갯수 계산 함수
  const totalCount = (user ? allCarts : nonMemberAllCarts)?.reduce(
    (acc, item) => acc + item.count,
    0
  );
  const totalPrice = (user ? allCarts : nonMemberAllCarts)?.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  // 배송비 무료를 위해서 얼마를 더 채워야 하는지 계산
  const freeDeliveryPercent = (totalPrice / 50000) * 100;
  const progressBarStyle = {
    width: `${freeDeliveryPercent}%`,
  };

  // x 버튼을 눌렀을 때 각 카트가 삭제되는 것
  const deleteCart = async (idx) => {
    if (user) {
      const deletedCarts = allCarts?.filter((c) => c.id !== idx);
      await setCartServer(user, deletedCarts);

      setAllCarts((prevCart) => prevCart?.filter((c) => c.id !== idx));
    } else if (user === null) {
      const deletedCarts = nonMemberAllCarts?.filter((c) => c.id !== idx);
      localStorage.setItem("carts", JSON.stringify(deletedCarts));
      setNonMemberAllCarts(deletedCarts);
    }
  };

  // 장바구니 비우기 버튼을 눌렀을 때 카트가 전부 삭제되는 것
  const handleAllDelete = async () => {
    if (user) {
      const allCarts = [];
      await setCartServer(user, allCarts);

      setAllCarts([]);
    } else if (user === null) {
      const allCarts = [];
      localStorage.setItem("carts", JSON.stringify(allCarts));
      setNonMemberAllCarts([]);
    }
  };

  // 장바구니 아이템 갯수 줄이는 함수
  const handleMinusCount = async (idx) => {
    if (user) {
      const minusCount = allCarts?.map((c) => {
        return c.id === idx && c.count > 0 ? { ...c, count: c.count - 1 } : c;
      });
      await setCartServer(user, minusCount);

      setAllCarts((prevCart) =>
        prevCart?.map((c) => {
          return c.id === idx && c.count > 0 ? { ...c, count: c.count - 1 } : c;
        })
      );
    } else if (user === null) {
      const updatedCart = nonMemberAllCarts?.map((c) => {
        return c.id === idx && c.count > 0 ? { ...c, count: c.count - 1 } : c;
      });

      localStorage.setItem("carts", JSON.stringify(updatedCart));
      setNonMemberAllCarts(updatedCart);
    }
  };

  // 장바구니 아이템 갯수 늘리는 함수
  const handlePlusCount = async (idx) => {
    if (user) {
      const plusCount = allCarts?.map((c) => {
        return c.id === idx ? { ...c, count: c.count + 1 } : c;
      });
      await setCartServer(user, plusCount);

      setAllCarts((prevCart) =>
        prevCart?.map((c) => {
          return c.id === idx ? { ...c, count: c.count + 1 } : c;
        })
      );
    } else if (user === null) {
      const updatedCart = nonMemberAllCarts?.map((c) => {
        return c.id === idx ? { ...c, count: c.count + 1 } : c;
      });

      localStorage.setItem("carts", JSON.stringify(updatedCart));
      setNonMemberAllCarts(updatedCart);
    }
  };

  // 전체 체크 박스를 토글하는 함수
  const handleSelectAll = () => {
    setSelectAll((prev) => !prev);
    if (!selectAll) {
      setSelectedItems(products?.map((product) => product.id));
    } else {
      setSelectedItems([]);
    }
  };

  // 개별 체크 박스를 토글하는 함수
  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems?.filter((itemId) => itemId !== id));
    }
  };

  // 선택된 데이터 삭제하는 함수
  const handleDelete = async () => {
    // allCarts에서 선택된 상품들을 제거하여 새로운 배열을 생성합니다.
    const updatedCarts = allCarts?.filter(
      (cart) => !selectedItems?.includes(cart.id)
    );

    const nonMemberUpdatedCarts = nonMemberAllCarts?.filter(
      (cart) => !selectedItems?.includes(cart.id)
    );

    if (user) {
      try {
        await setCartServer(user, updatedCarts);

        setAllCarts(updatedCarts);
        setProducts(updatedCarts?.map((cart) => ({ ...cart })));
      } catch (error) {
        console.error(error);
      }
    } else if (user === null) {
      localStorage.setItem("carts", JSON.stringify(nonMemberUpdatedCarts));

      setNonMemberAllCarts(nonMemberUpdatedCarts);
      setProducts(nonMemberUpdatedCarts.map((cart) => ({ ...cart })));
    }

    setSelectedItems([]);
    setSelectAll(false);
  };

  const inCarts =
    (user && allCarts?.length === 0) ||
    (!user && nonMemberAllCarts?.length === 0)
      ? false
      : (user && allCarts?.length > 0) ||
        (!user && nonMemberAllCarts?.length > 0)
      ? true
      : null;
  const comment = !inCarts ? <p>장바구니가 비어 있습니다.</p> : null;
  const datas = user ? allCarts : nonMemberAllCarts;

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto mt-32 pt-10">
        <h1 className="font-semibold text-[1.875rem] mb-16 text-center">
          Cart
        </h1>

        <div className="w-full py-14 border-t-[1px] border-solid border-[#333] flex justify-between items-start">
          {comment}

          {/* left */}
          <div className={`${inCarts ? "block" : "hidden"} w-[70%]`}>
            <div className="w-full mb-4 flex items-center text-[#282828]">
              <p>일반상품</p>
              <p className="ml-1">{`(${datas?.length})`}</p>
            </div>

            <table className="w-full border-t-[1px] border-solid border-[#282828] text-[0.875rem] text-[#333]">
              <thead>
                <tr className="w-full h-[40px] py-[20px] border-b-[1px] border-solid border-[#e5e5e5]">
                  <th className="w-[10%] py-[20px]">
                    <CheckboxInput
                      checked={selectAll}
                      onChange={handleSelectAll}
                      styles="w-5 h-5"
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
                {datas
                  ?.filter((cart) => (user ? cart.userId === user.uid : true))
                  ?.map((cart) => {
                    return (
                      <tr
                        className="w-full border-b-[1px] border-solid border-[#e5e5e5]"
                        key={cart.id}
                      >
                        <td className="w-[10%] text-center">
                          <CheckboxInput
                            checked={selectedItems.includes(cart.id)}
                            onChange={(e) => handleCheckboxChange(e, cart.id)}
                            styles="w-5 h-5"
                          />
                        </td>
                        <td className="w-[20%]">
                          <img
                            className="w-[40%] mx-auto object-cover my-5"
                            src={process.env.PUBLIC_URL + `/../${cart.image}`}
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
                            <Button
                              value="-"
                              onClick={() => handleMinusCount(cart.id)}
                              styleType="grayBorder"
                              styles="w-8 h-8 border-r-[1px] text-[0.875rem] flex justify-center items-center"
                            />
                            <p className="w-8 h-8 flex justify-center items-center text-[0.875rem]">
                              {cart.count}
                            </p>
                            <Button
                              value="+"
                              onClick={() => handlePlusCount(cart.id)}
                              styleType="grayBorder"
                              styles="w-8 h-8 border-l-[1px] text-[0.875rem] flex justify-center items-center"
                            />
                          </div>
                        </td>
                        <td className="w-[10%] text-center text-[1rem]">-</td>
                        <td className="w-[10%] whitespace-pre-wrap text-center text-[0.875rem] text-[#333]">
                          <p>{totalPrice < 50000 ? 2500 : 0}원</p>
                        </td>
                        <td className="w-[10%] text-center text-[1.6rem] text-[#333]">
                          <Button icon={<CiHeart />} />
                          <Button
                            icon={<GoX />}
                            onClick={() => deleteCart(cart.id)}
                            styles="ml-2"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>

              <tfoot>
                <tr className="w-full box-border border-b-[1px] border-solid border-[#e5e5e5] text-right">
                  <td className="p-3 text-[0.75rem] text-[#333]">[기본배송]</td>
                </tr>
              </tfoot>
            </table>

            <div className="flex items-center justify-between w-full mt-7">
              <Button
                value="삭제하기"
                onClick={handleDelete}
                styleType="grayBorder"
                styles="h-[35px] px-3 border-[1px] flex justify-center items-center text-[0.875rem] text-[#333]"
              />
              <Button
                value="장바구니 비우기"
                onClick={handleAllDelete}
                styleType="grayBorder"
                styles="h-[35px] px-3 border-[1px] flex justify-center items-center text-[0.875rem] text-[#333]"
              />
            </div>
          </div>

          {/* right */}
          <div className="w-[26%]">
            <div className="w-full border-[1px] border-solid border-[#e5e5e5]">
              <FreeShippingCount
                totalPrice={totalPrice}
                progressBarStyle={progressBarStyle}
              />

              <CartTotalPrice totalPrice={totalPrice} totalCount={totalCount} />
            </div>

            <div className="flex flex-col items-center w-full mt-5">
              <Button
                value="전체상품주문"
                styleType="blackBg"
                styles="w-full py-5 mb-3 box-border text-white"
              />
              <Button
                value="선택상품주문"
                styleType="blackBorder"
                styles="w-full py-5 mb-3 box-border border-[1px] text-black"
              />
              <Button
                icon={<CiGift />}
                styleType="blackBorder"
                styles="w-full py-5 box-border border-[1px] flex justify-center items-center text-[1.6rem] text-[#ff5151]"
              >
                <p className="ml-1 text-[1rem] text-black">선물하기</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
