import React from "react";
import { BsChevronRight } from "react-icons/bs";

export default function NextArrow() {
  return (
    <>
      <div className="text-[1.875rem] text-[white] absolute top-[40%] right-[10px] z-[9999999] cursor-pointer">
        <BsChevronRight />
      </div>
    </>
  );
}
