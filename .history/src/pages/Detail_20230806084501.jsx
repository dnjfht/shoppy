import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { attach_won } from "./Main";
import { v4 as uuidv4 } from "uuid";

import { GoX } from "react-icons/go";
import { CiHeart, CiGift, CiDeliveryTruck, CiEdit } from "react-icons/ci";
import { PiShareNetworkThin } from "react-icons/pi";
import { RiCoupon3Fill } from "react-icons/ri";
import { GiCutDiamond } from "react-icons/gi";
import { HiGift } from "react-icons/hi";
import { MdFiberNew } from "react-icons/md";
import DetailInfo from "../components/DetailInfo";
import DetailQuestion from "../components/DetailQuestion";
import DetailReview from "../components/DetailReview";
import DetailCS from "../components/DetailCS";

export default function Detail({ userInfo, setAllCarts }) {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);
  const [cat, setCat] = useState("상품정보");

  const colorInputRef = useRef(null);
  const sizeInputRef = useRef(null);

  const navigate = useNavigate();

  const {
    state: { item },
  } = useLocation();

  const handleSelectColor = (e) => {
    setColor(e.target.value);
  };

  const handleSelectSize = (e, selectedColor) => {
    setSize(e.target.value);

    if (selectedColor === "" || e.target.value === "") {
      alert("옵션을 선택해주세요.");
    } else {
      const existingProductIndex = cart.findIndex((item) => {
        return item.color === selectedColor && item.size === e.target.value;
      });

      if (existingProductIndex !== -1) {
        setCart((prev) =>
          prev.map((item, index) => {
            return index === existingProductIndex
              ? { ...item, count: item.count + 1 }
              : item;
          })
        );
      } else {
  
          const productInfo = userInfo === null ? ({
            id: uuidv4(),
            title: item.title,
            image: item.image,
            color: selectedColor,
            size: e.target.value,
            count: 1,
            price: item.salePrice,
          }) : ( {
            userId: userInfo.uid,
            id: uuidv4(),
            title: item.title,
            image: item.image,
            color: selectedColor,
            size: e.target.value,
            count: 1,
            price: item.salePrice,
          });
          
          setCart((prev) => [...prev, productInfo]);
        }
      }

      colorInputRef.current.value = "- [필수] 옵션을 선택해 주세요 -";
      sizeInputRef.current.value = "- [필수] 옵션을 선택해 주세요 -";
    }
  };

  const deleteCart = (idx) => {
    setCart((prevCart) => prevCart.filter((c) => c.id !== idx));
  };

  const handleMinusCount = (idx) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        return c.id === idx && c.count > 0 ? { ...c, count: c.count - 1 } : c;
      })
    );
  };

  const handlePlusCount = (idx) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        return c.id === idx ? { ...c, count: c.count + 1 } : c;
      })
    );
  };

  const totalCount = cart.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.count * item.price,
    0
  );

  const category = ["상품정보", "사용후기", "교환 및 반품", "상품문의"];

  console.log(item);

  const handlePushCarts = () => {
    // Instead of updating local cart, update the allCarts in the App component.
    setAllCarts((prevAllCarts) => [...prevAllCarts, ...cart]);
    setCart([]); // Clear the local cart after adding items to allCarts
    navigate("/carts");
  };

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto pt-52 pb-20 flex flex-col justify-between">
        <div className="w-full pb-32 border-b-[1px] border-bottom border-[#ccc] flex justify-between">
          <div className="w-[47%]">
            <img
              className="w-full object-cover"
              src={process.env.PUBLIC_URL + `/../${item.image}`}
              alt="item_img"
            />
          </div>

          <div className="w-[47%]">
            <div className="w-full pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="w-full flex items-center justify-between">
                <div className="w-4/5 flex">
                  {item?.banner?.map((b) => {
                    return (
                      <p
                        className={`${
                          b === "new"
                            ? "border-[deeppink] text-[deeppink]"
                            : "border-[#30d0b3] text-[#30d0b3]"
                        } w-20 p-1 mr-2 border-[1px] border-solid text-[0.8rem] flex justify-center items-center`}
                      >
                        {b}
                      </p>
                    );
                  })}
                </div>

                <div className="w-1/5 text-[1.8rem] flex justify-end">
                  <button>
                    <CiHeart />
                  </button>

                  <button className="ml-3">
                    <PiShareNetworkThin />
                  </button>
                </div>
              </div>

              <h1 className="text-[1.5rem] text-[#282828] font-semibold mt-2">
                {item.title}
              </h1>

              <div className="mt-1 text-[#f98888] text-[1.5rem] font-semibold flex items-baseline">
                <h1>{salePercent(item.price, item.salePrice)}</h1>
                <h1 className="ml-2">{attach_won(item.salePrice)}</h1>
                <h1 className="ml-1 text-[1.125rem] text-[#aaa] font-normal line-through">
                  {attach_won(item.price)}
                </h1>
              </div>
            </div>

            <div className="w-full py-[30px] text-[0.875rem] text-[#999] font-semibold pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="w-full mb-3 flex items-center">
                <p className="w-1/6">판매가</p>
                <p className="line-through w-5/6 text-[#333] font-normal">
                  {attach_won(item.price)}
                </p>
              </div>
              <div className="w-full mb-3 flex items-center">
                <p className="w-1/6">할인판매가</p>
                <p className="w-5/6 text-[#333] font-normal">
                  {attach_won(item.salePrice)}
                </p>
              </div>
              <div className="w-full flex items-center">
                <p className="w-1/6">상품간략설명</p>
                <p className="w-5/6 text-[#333] font-normal leading-16">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="w-full py-[30px] text-[0.875rem] text-[#999] font-semibold pb-[30px] border-b-[1px] border-solid border-[#ccc]">
              <div className="w-full mb-4 flex items-center">
                <p className="w-1/6">색상</p>
                <select
                  ref={colorInputRef}
                  onChange={(e) => handleSelectColor(e)}
                  className="w-5/6 p-3 border-[1px] bg-transparent border-solid border-[#e5e5e5] outline-none"
                >
                  <option disabled selected>
                    - [필수] 옵션을 선택해 주세요 -
                  </option>
                  {item &&
                    item?.option?.color?.map((c) => {
                      return (
                        <option value={c} key={c} className="hover:bg-black">
                          {c}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="flex">
                <p className="w-1/6">사이즈</p>
                <select
                  ref={sizeInputRef}
                  onChange={(e) => handleSelectSize(e, color)}
                  className="w-5/6 p-3 border-[1px] bg-transparent border-solid border-[#e5e5e5] outline-none"
                >
                  <option disabled selected>
                    - [필수] 옵션을 선택해 주세요 -
                  </option>
                  {item &&
                    item?.option?.size?.map((s) => {
                      return (
                        <option value={s} key={s}>
                          {s}
                        </option>
                      );
                    })}
                </select>
              </div>

              <ul className="w-full mt-[30px]">
                {cart &&
                  cart?.map((c) => {
                    return (
                      <li
                        key={c.id}
                        className="w-full p-4 mb-2 box-border bg-[#f6f6f6] flex justify-between items-center text-[0.875rem] text-[#333]"
                      >
                        <div>
                          <p>{c.title}</p>
                          <p className="text-[#888888]">{`- ${c.color} / ${c.size}`}</p>
                        </div>

                        {/* count 증가 감소 버튼 */}
                        <div className="flex items border-[1px] border-solid border-[#cacaca] font-normal">
                          <button
                            onClick={() => {
                              handleMinusCount(c.id);
                            }}
                            className="w-8 h-8 bg-[#cacaca] text-[1.2rem] flex justify-center items-center border-r-[1px] border-solid border-[#cacaca]"
                          >
                            -
                          </button>
                          <p className="w-8 h-8 flex justify-center items-center">
                            {c.count}
                          </p>
                          <button
                            onClick={() => {
                              handlePlusCount(c.id);
                            }}
                            className="w-8 h-8 bg-[#cacaca] text-[1.2rem] flex justify-center items-center border-l-[1px] border-solid border-[#cacaca]"
                          >
                            +
                          </button>
                        </div>

                        {/* salePrice 계산 */}
                        <div className="w-1/5 flex justify-end">
                          <p className="text-[0.9375rem] mr-2">
                            {attach_won(c.price * c.count)}
                          </p>

                          <button
                            onClick={() => deleteCart(c.id)}
                            className="text-[1.4rem] text-[#787878]"
                          >
                            <GoX />
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>

            <div className="w-full py-[30px] text-[0.875rem] text-[#333] font-semibold flex justify-between items-center">
              <p>총 상품 금액</p>

              <div className="flex items-center text-[0.875rem] text-[#000] font-normal">
                <p className="text-[1.5rem]  font-bold">
                  {attach_won(totalPrice)}
                </p>
                <p className="ml-2">{`(${totalCount}개)`}</p>
              </div>
            </div>

            <div className="flex justify-between items-center font-semibold">
              <button
                onClick={handlePushCarts}
                className="w-[32%] py-5 border-[1px] border-solid border-black"
              >
                장바구니
              </button>
              <button className="w-[32%] py-5 bg-[#333] text-white">
                구매하기
              </button>
              <button className="w-[32%] py-5 bg-black flex justify-center items-center text-white">
                <p className="text-[1.6rem] text-[#ff5151]">
                  <CiGift />
                </p>
                <p className="ml-1">선물하기</p>
              </button>
            </div>

            {/* kakao event banner */}
            <div className="w-full pt-[30px]">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/../image/banner/kakaoEventBanner.png"
                }
                alt="kakao_event_banner"
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-10">
          <div>
            <h1 className="mb-6 text-[1.5rem] text-[#333] font-semibold">
              특별한 회원 혜택
            </h1>

            <ul className="w-full flex justify-between items-center text-[0.8125rem] text-[#999]">
              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <RiCoupon3Fill />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  신규회원 할인혜택
                </p>
                <p>회원가입 시 신규가입 축하</p>
                <p>
                  <span className="text-[#f57778]">20,000원 쿠폰팩</span> 즉시
                  지급
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <GiCutDiamond />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  등급별 추가할인
                </p>
                <p>
                  <span className="text-[#f57778]">회원 할인 + 구매 적립</span>
                </p>
                <p>
                  <span className="text-[#f57778]">
                    + 무료배송 + 사이즈 무료 교환
                  </span>
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <HiGift />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  생일 쿠폰 지급
                </p>
                <p>즐거운 날을 위해</p>
                <p>
                  <span className="text-[#f57778]">
                    365일 사용 가능한 할인쿠폰
                  </span>{" "}
                  지급
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <CiDeliveryTruck />
                </div>
                <p className="text-[0.9375rem] text-[#333] font-semibold">
                  5만원이상 무료배송
                </p>
                <p>Birthday Party 전상품</p>
                <p>
                  <span className="text-[#f57778]">
                    5만원이상 결제시 무료배송
                  </span>
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 border-r-[1px] border-solid border-[#ccc] flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <CiEdit />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  리뷰 작성시 적립금
                </p>
                <p>유형에 따라 적립금</p>
                <p>
                  <span className="text-[#f57778]">500원 ~ 1500원 차등</span>{" "}
                  지급
                </p>
              </li>

              <li className="cursor-pointer w-1/6 py-1 flex flex-col items-center">
                <div className="mb-4 text-[3rem] text-[#f57778]">
                  <MdFiberNew />
                </div>
                <p className="mb-2 text-[0.9375rem] text-[#333] font-semibold">
                  신상 5% 할인
                </p>
                <p>매일 매일 UP되는 신상</p>
                <p>
                  <span className="text-[#f57778]">5% 할인가</span>에 득템
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* detail banner */}
        <div className="w-full py-32">
          <img
            className="w-full object-cover cursor-pointer"
            src={process.env.PUBLIC_URL + "/../image/banner/detailBanner1.png"}
            alt="detail_banner"
          />
          <img
            className="w-full object-cover mt-6 cursor-pointer"
            src={process.env.PUBLIC_URL + "/../image/banner/detailBanner2.png"}
            alt="detail_banner"
          />
        </div>

        {/* detail page tab */}
        <div className="w-full">
          <div className="w-full flex">
            {category &&
              category?.map((c) => {
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCat(c);
                    }}
                    className={`${
                      c === cat ? "bg-opacity-100" : "bg-opacity-0"
                    } w-1/4 py-5 border-[1px] bg-[#282828] border-solid border-[#ccc] border-b-[#333] rounded-t-lg transition-all duration-700`}
                  >
                    <p
                      className={`${
                        c === cat ? "text-white" : "text-[#333]"
                      } text-[0.9375rem] font-semibold`}
                    >
                      {c}
                    </p>
                  </button>
                );
              })}
          </div>

          {cat === "상품정보" && <DetailInfo detailImg={item.detailImg} />}
          {cat === "사용후기" && <DetailReview />}
          {cat === "교환 및 반품" && <DetailCS />}
          {cat === "상품문의" && <DetailQuestion />}
        </div>
      </div>
    </div>
  );
}

export const salePercent = (price, salePrice) => {
  const percent = parseInt(price / (price - salePrice));
  return percent + "%";
};
