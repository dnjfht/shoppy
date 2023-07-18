import React from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function PrevArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[4.4rem] text-[white] absolute top-[40%] left-[160px] z-[9999999] cursor-pointer"
      >
        <BsChevronLeft />
      </div>
    </>
  );
}
