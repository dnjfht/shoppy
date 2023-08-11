import React from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function PrevArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[rgba(255,255,255,0.6) text-[4.4rem] absolute top-[42%] left-[14%] z-[9999999] cursor-pointer"
      >
        <BsChevronLeft />
      </div>
    </>
  );
}
