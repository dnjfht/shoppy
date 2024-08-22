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

  console.log(
    "selectAll",
    String(selectAll),
    "selectedItems",
    selectedItems,
    "products",
    products,
    "allCarts",
    allCarts
  );

  useEffect(() => {
    if (user) {
      setProducts(allCarts?.map((cart) => ({ ...cart })));
    } else {
      setProducts(nonMemberAllCarts?.map((cart) => ({ ...cart })));
    }
  }, [user, allCarts, nonMemberAllCarts]);

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
      console.log("sdgedgg");
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
      <div className="mx-auto mt-32 md:pt-10 3sm:pt-4 w-full xl:max-w-[70%] 3sm:w-[90%]">
        <h1 className="font-semibold md:text-[1.875rem] 3sm:text-[1.5rem] lg:mb-16 sm:mb-10 3sm:mb-6 text-center">
          Cart
        </h1>

        <div className="w-full md:py-14 3sm:py-10 border-t-[1px] border-solid border-[#333] xl:flex justify-between items-start">
          {comment}

          {/* left */}
          <div
            className={`${
              inCarts ? "block" : "hidden"
            } xl:w-[70%] order-1 3sm:w-full`}
          >
            <div className="w-full md:mb-4 3sm:mb-2 flex items-center md:text-[1rem] 3sm:text-[0.875rem] text-[#282828]">
              <p>일반상품</p>
              <p className="ml-1">{`(${datas?.length})`}</p>
            </div>

            <table className="w-full border-t-[1px] border-solid border-[#282828] md:text-[0.875rem] 3sm:text-[0.76rem] text-[#333]">
              <thead>
                <tr className="w-full h-[40px] py-[20px] border-b-[1px] border-solid border-[#e5e5e5]">
                  <th className="md:w-[10%] 3sm:w-[2%] py-[20px]">
                    <CheckboxInput
                      checked={selectAll}
                      onChange={handleSelectAll}
                      styles="md:w-5 3sm:w-4 md:h-5 3sm:h-4"
                    />
                  </th>
                  <th className="w-[20%]">이미지</th>
                  <th className="md:w-[20%] 3sm:w-[15%]">상품정보</th>
                  <th className="md:w-[15%] 3sm:w-[20%]">판매가</th>
                  <th className="md:w-[15%] 3sm:w-[18%]">수량</th>
                  <th className="w-[10%]">배송비</th>
                  <th className="md:w-[10%] 3sm:w-[15%]">선택</th>
                </tr>
              </thead>

              <tbody>
                {datas
                  ?.filter((cart) => (user ? cart.userId === user.uid : true))
                  ?.map((cart) => {
                    return (
                      <tr
                        className="w-full border-b-[1px] border-solid border-[#e5e5e5] text-center"
                        key={cart.id}
                      >
                        <td>
                          <CheckboxInput
                            checked={selectedItems.includes(cart.id)}
                            onChange={(e) => handleCheckboxChange(e, cart.id)}
                            styles="md:w-5 3sm:w-4 md:h-5 3sm:h-4"
                          />
                        </td>
                        <td>
                          <img
                            className="md:w-[34%] 3sm:w-[50%] mx-auto object-cover my-5"
                            src={process.env.PUBLIC_URL + `/../${cart.image}`}
                            alt="product_img"
                          />
                        </td>
                        <td className="text-left">
                          <p className="text-[#333] font-semibold line-clamp-1">
                            {cart.title}
                          </p>
                          <p className="text-[#999] line-clamp-1">{`[옵션: ${cart.color}/${cart.size}]`}</p>
                        </td>
                        <td className="text-[#333] font-semibold">
                          <p>{attach_won(cart.price * cart.count)}</p>
                        </td>
                        <td>
                          <div className="flex items-center justify-between w-full mx-auto font-normal 2sm:flex-row 3sm:flex-col">
                            <Button
                              value="-"
                              onClick={() => handleMinusCount(cart.id)}
                              styleType="grayBorder"
                              styles="2sm:w-[33.333%] 3sm:w-[50%] aspect-square border-r-[1px] flex justify-center items-center"
                            />
                            <p className="2sm:w-[33.333%] 3sm:w-[50%] aspect-square flex justify-center items-center 2sm:border-t-[1px] 2sm:border-b-[1px] 3sm:border-l-[1px] 3sm:border-r-[1px] border-solid border-[#cacaca]">
                              {cart.count}
                            </p>
                            <Button
                              value="+"
                              onClick={() => handlePlusCount(cart.id)}
                              styleType="grayBorder"
                              styles="2sm:w-[33.333%] 3sm:w-[50%] aspect-square border-l-[1px] flex justify-center items-center"
                            />
                          </div>
                        </td>
                        <td className="whitespace-pre-wrap text-[#5d5b5b]">
                          <p>{totalPrice < 50000 ? 2500 : 0}원</p>
                        </td>
                        <td className="md:text-[1.6rem] 3sm:text-[1.2rem] text-[#333]">
                          <Button icon={<CiHeart />} />
                          <Button
                            icon={<GoX />}
                            onClick={() => deleteCart(cart.id)}
                            styles="md:ml-2 2sm:ml-1 3sm:ml-0"
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="w-full p-3 box-border border-b-[1px] border-solid border-[#e5e5e5] md:text-[0.8125rem] 3sm:text-[0.75rem] text-[#333] text-right">
              [기본배송]
            </div>

            <div className="flex items-center justify-between w-full md:mt-7 3sm:mt-4">
              <Button
                value="삭제하기"
                onClick={handleDelete}
                styleType="grayBorder"
                styles="h-[35px] md:px-3 3sm:px-2 border-[1px] flex justify-center items-center md:text-[0.875rem] 3sm:text-[0.75rem] text-[#333]"
              />
              <Button
                value="장바구니 비우기"
                onClick={handleAllDelete}
                styleType="grayBorder"
                styles="h-[35px] md:px-3 3sm:px-2 border-[1px] flex justify-center items-center md:text-[0.875rem] 3sm:text-[0.75rem] text-[#333]"
              />
            </div>
          </div>

          {/* right */}
          <div className="xl:w-[26%] order-2 3sm:w-full xl:mt-0 3sm:mt-14">
            <div className="w-full border-[1px] border-solid border-[#e5e5e5]">
              <FreeShippingCount
                totalPrice={totalPrice}
                progressBarStyle={progressBarStyle}
              />

              <CartTotalPrice totalPrice={totalPrice} totalCount={totalCount} />
            </div>

            <div className="xl:block 3sm:grid grid-cols-3 gap-x-2 w-full mt-5 md:text-[1rem] 3sm:text-[0.875rem]">
              <Button
                value="전체상품주문"
                styleType="blackBg"
                styles="xl:w-full md:py-5 3sm:py-3 xl:mb-3 box-border text-white"
              />
              <Button
                value="선택상품주문"
                styleType="blackBorder"
                styles="xl:w-full md:py-5 3sm:py-3 xl:mb-3 box-border border-[1px] text-black"
              />
              <Button
                icon={<CiGift />}
                styleType="blackBorder"
                styles="xl:w-full md:py-5 3sm:py-3 xl:mb-3 box-border border-[1px] flex justify-center items-center md:text-[1.6rem] 3sm:text-[1.2rem] text-[#ff5151]"
              >
                <p className="ml-1 md:text-[1rem] 3sm:text-[0.875rem] text-black">
                  선물하기
                </p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
