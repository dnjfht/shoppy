import React from "react";
import { useNavigate } from "react-router-dom";
import { attach_won, shortString } from "../../pages/Main";

import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export default function ProductCard({ item, index }) {
  const navigate = useNavigate();

  return (
    <li
      className={`w-[24%] mb-6 ${
        index % 4 === 3 || index === 3 ? "mr-0" : "mr-[1.3%]"
      } cursor-pointer relative text-center list-none`}
    >
      <div className="relative w-full group">
        <ul className="px-4 py-3 rounded-full bg-black flex flex-wrap justify-between items-center absolute top-2 left-2 [&>*:last-child]:mr-0 [&>*:last-child]:pr-0 [&>*:last-child]:border-none">
          {item.type?.map((t, index) => {
            return (
              <li
                key={index}
                className="text-white text-[0.9rem] pr-2 mr-2 border-r-[1px] border-solid border-white"
              >
                {t}
              </li>
            );
          })}
        </ul>

        <img
          className="w-full rounded-lg object-fit"
          src={process.env.PUBLIC_URL + `/../${item.image}`}
          alt="img"
        />

        <div
          onClick={() => {
            navigate(`/products/detail/${item.id}`, { state: { item } });
          }}
          className="group-hover:h-14 group-hover:shadow-[0_-14px_12px_-2px_rgba(0,0,0,0.1)] absolute bottom-0 w-full h-0 bg-[rgba(0,0,0,0.94)] rounded-b-lg flex justify-center items-center transition-all duration-700 overflow-hidden"
        >
          <p className="text-[0.9rem] text-white">구매하기</p>
        </div>
      </div>

      <div className="py-6">
        <p className="text-[1rem] font-semibold">{item.title}</p>

        <p className="mt-2 text-[0.875rem] text-[#484848]">
          {shortString(item.description, 28)}
        </p>
        <div className="flex items-center justify-center mt-4">
          <p className="mr-2 text-[0.875rem] text-gray-400 line-through">
            {attach_won(item.price)}
          </p>

          <p className="mr-2 text-[0.875rem] text-gray-400">
            <LiaLongArrowAltRightSolid />
          </p>

          <p className="text-[1rem] text-[#f00]">
            {attach_won(item.salePrice)}
          </p>
        </div>
      </div>
    </li>
  );
}
