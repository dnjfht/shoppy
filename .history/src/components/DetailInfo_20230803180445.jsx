import React, { useState } from "react";

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
      } w-full py-[50px] px-[12rem] relative`}
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
      <button onClick={(e) => handleClickFold(e)}>{`${
        fold ? "상세정보 접기" : "상세정보 펼쳐보기"
      }`}</button>
    </div>
  );
}
