import React from "react";
import { BsChevronRight } from "react-icons/bs";

export default function NextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="border-[1px] border-solid border-[#282828] text-[4.4rem] text-[rgba(255,255,255,0.6)] absolute top-[42%] right-[14%] z-[9999999] cursor-pointer"
      >
        <BsChevronRight />
      </div>
    </>
  );
}
