import React from "react";
import { useLocation } from "react-router-dom";
import { attach_won } from "./Main";

export default function Detail() {
  const {
    state: { item },
  } = useLocation();

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
            <>
              {item?.banner?.map((b) => {
                return (
                  <p
                    className={`${
                      b === "new"
                        ? "border-[deeppink] text-[deeppink]"
                        : "border-[#30d0b3] text-[#30d0b3]"
                    } w-20 p-1 border-[1px] border-solid text-[0.8rem] flex justify-center items-center`}
                  >
                    {b}
                  </p>
                );
              })}
            </>

            <h1 className="text-[1.5rem] text-[#282828] font-semibold mt-2">
              {item.title}
            </h1>

            <div className="mt-1 text-[#f98888] text-[1.5rem] font-semibold flex items-baseline">
              <h1>{salePercent(item.price, item.salePrice)}</h1>
              <h1 className="ml-2">{attach_won(item.price)}</h1>
              <h1 className="ml-1 text-[1.125rem] text-[#aaa] font-normal line-through">
                {attach_won(item.salePrice)}
              </h1>
            </div>
          </div>

          <div>
            <div className="w-full py-[30px] flex">
              <p>판매가</p>
              <p className="line-through">{attach_won(item.price)}</p>
            </div>
            <div className="w-full flex">
              <p>할인판매가</p>
              <p>{attach_won(item.salePrice)}</p>
            </div>
            <div className="w-full flex">
              <p>상품간략설명</p>
              <p>{item.description}</p>
            </div>
          </div>

          <div>
            <p>색상</p>
            <select>
              <option disabled hidden selected>
                - [필수] 옵션을 선택해 주세요 -
              </option>
              {item &&
                item?.option?.color?.map((c) => {
                  return (
                    <option value={c} key={c}>
                      {c}
                    </option>
                  );
                })}
            </select>
          </div>

          <div>
            <p>사이즈</p>
            <select>
              <option disabled hidden selected>
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
        </div>
      </div>
    </div>
  );
}

export const salePercent = (price, salePrice) => {
  const percent = parseInt(price / (price - salePrice));
  return percent + "%";
};
