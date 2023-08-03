import React, { useState } from "react";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";

export default function DetailInfo({ detailImg }) {
  const [fold, setFold] = useState(false);

  const handleClickFold = (e) => {
    e.preventDefault();

    setFold((prev) => !prev);
  };

  return (
    <div
      className={`${
        fold ? "height-[auto]" : "h-[2650px] "
      } w-full py-[50px] px-[12rem] overflow-hidden relative`}
    >
      {detailImg &&
        detailImg?.map((img) => {
          return (
            <img
              className="w-full object-cover"
              src={process.env.PUBLIC_URL + `/../${img}`}
              alt="detail_img"
            />
          );
        })}

      <div className="w-[100%] h-[180px] bg-gradient-to-b from-transparent from-[6%] to-white to-[62%] absolute bottom-0" />
      <button
        onClick={(e) => handleClickFold(e)}
        className="w-[22.5rem] h-[80px] absolute left-[50%] ml-[-11.25rem] bottom-[50px] z-[999999] text-[1.2rem] rounded-[10px] bg-[#000000] mx-auto flex justify-center items-center text-[white] font-light hover:bg-[white] hover:border-[1px] hover:border-solid hover:border-[#282828] hover:text-[#282828] transition-all duration-[0.5s]"
      >{`${fold ? "상세정보 접기" : "상세정보 펼쳐보기"}`}</button>
    </div>
  );
}
