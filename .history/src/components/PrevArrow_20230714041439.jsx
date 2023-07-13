import React from "react";
import { BsChevronLeft } from "react-icons/bs";

export default function PrevArrow() {
  return (
    <>
      <div className="text-[1.875rem] text-[white] absolute top-[40%] left-[10px] z-[9999] cursor-pointer">
        <BsChevronLeft className="drop-shadow-[-4px_6px_1px_rgba(0,0,0,0.4)]" />
      </div>
    </>
  );
}
