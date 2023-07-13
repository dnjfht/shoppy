import React from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function PrevArrow() {
  return (
    <>
      <div className="text-[1.875rem] text-[white] absolute top-[40%] left-[10px] z-[9999999] cursor-pointer">
        <BsChevronLeft />
      </div>
    </>
  );
}
