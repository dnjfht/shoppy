import React from "react";
import { useLocation } from "react-router-dom";
import { attach_won } from "./Main";

export default function Detail() {
  const {
    state: { item },
  } = useLocation();

  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto pt-52 pb-20 flex">
        <img
          src={process.env.PUBLIC_URL + `/../${item.image}`}
          alt="item_img"
        />

        <div>
          <p>{item.title}</p>
          <div>
            <p>판매가 : </p>
            <p>{attach_won(item.price)}</p>
          </div>
          <div>
            <p>할인판매가 : </p>
            <p>{attach_won(item.salePrice)}</p>
          </div>

          <div>
            <p>옵션 선택 : </p>
            <select>
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
        </div>
      </div>
    </div>
  );
}
