import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { attach_won, shortString } from "../pages/Main";

export default function ProductCard({ item, index }) {
  const navigate = useNavigate();

  const checkIndex = () => {
    console.log(index);
  };
  return (
    <li
      onClick={checkIndex()}
      className={`w-[24%] mb-32 ${
        index % 4 === 3 || index === 3 ? "mr-0" : "mr-[1.3%]"
      } cursor-pointer relative`}
    >
      <div className="w-full group">
        <div className="w-12 h-12 rounded-full bg-black flex justify-center items-center absolute top-2 left-2">
          <p className="text-white text-[0.9rem]">{item.type}</p>
        </div>

        <img
          className="w-full object-fit rounded-lg"
          src={process.env.PUBLIC_URL + `${item.image}`}
          alt="img"
        />

        <div
          onClick={() => {
            navigate(`/products/detail/${item.id}`);
          }}
          className="group-hover:h-14 group-hover:shadow-[0_-14px_12px_-2px_rgba(0,0,0,0.1)] absolute bottom-[25%] w-full h-0 bg-[rgba(0,0,0,0.94)] rounded-b-lg flex justify-center items-center transition-all duration-700 overflow-hidden"
        >
          <p className="text-[0.9rem] text-white">구매하기</p>
        </div>
      </div>

      <div className="py-6">
        <p className="text-[1rem] font-semibold">{item.title}</p>

        <p className="mt-2 text-[0.875rem] text-[#484848]">
          {shortString(item.description, 28)}
        </p>
        <div className="mt-4 flex justify-center items-center">
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
