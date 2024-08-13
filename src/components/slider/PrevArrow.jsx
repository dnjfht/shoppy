import React from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function PrevArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[rgba(255,255,255,0.6) sm:text-[4.4rem] 3sm:text-[3rem] absolute top-[42%] sm:left-[14%] 3sm:left-[4%] z-[9999999] cursor-pointer"
      >
        <BsChevronLeft />
      </div>
    </>
  );
}
