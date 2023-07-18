import React from "react";
import { BsChevronRight } from "react-icons/bs";

export default function NextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[3rem] text-[white] absolute top-[40%] right-[10px] z-[9999999] cursor-pointer"
      >
        <BsChevronRight />
      </div>
    </>
  );
}
