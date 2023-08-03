import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { attach_won } from "./Main";
import { GoX } from "react-icons/go";
import { v4 as uuidv4 } from "uuid";

export default function Detail() {
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [cart, setCart] = useState([]);

  const colorInputRef = useRef(null);
  const sizeInputRef = useRef(null);

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
        const productInfo = {
          id: uuidv4(),
          title: item.title,
          color: selectedColor,
          size: e.target.value,
          count: 1,
          price: item.salePrice,
        };
        setCart((prev) => [...prev, productInfo]);
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

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto pt-52 pb-20 flex justify-between">
        <div className="w-[47%]">
          <img
            className="w-full object-cover"
            src={process.env.PUBLIC_URL + `/../${item.image}`}
            alt="item_img"
          />
        </div>

        <div className="w-[47%]">
          <div className="w-full pb-[30px] border-b-[1px] border-solid border-[#ccc]">
            <div className="w-full flex items-center">
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
                      <div className="flex">
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

            <div className="flex items-center">
              <p className="text-[1.5rem] text-[#000] font-bold">
                {attach_won(totalPrice)}
              </p>
              <p>{`(${totalCount}개)`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const salePercent = (price, salePrice) => {
  const percent = parseInt(price / (price - salePrice));
  return percent + "%";
};
