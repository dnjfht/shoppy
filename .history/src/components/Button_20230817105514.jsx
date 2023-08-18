import React from "react";

export default function Button({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${
        value === "리뷰 쓰기" || value === "등록"
          ? "w-full hover:bg-opacity-0 hover:border-black hover:text-black"
          : "w-44  hover:bg-opacity-0 hover:border-white "
      } last:py-3 bg-black bg-opacity-100 border-[1px] border-solid border-black mt-6 rounded-lg text-[0.875rem] text-white transition-all duration-700`}
    >
      {value}
    </button>
  );
}
