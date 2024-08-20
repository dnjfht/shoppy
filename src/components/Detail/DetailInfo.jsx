import { useState } from "react";
import Button from "../button/Button";

import { BsCaretDown, BsCaretUp } from "react-icons/bs";

export default function DetailInfo({ detailImg }) {
  const [fold, setFold] = useState(false);

  const handleClickFold = () => {
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
              className="object-cover w-full"
              src={process.env.PUBLIC_URL + `/../${img}`}
              alt="detail_img"
            />
          );
        })}

      <div className="w-[100%] h-[180px] bg-gradient-to-b from-transparent from-[6%] to-white to-[62%] absolute bottom-0" />
      <Button
        value={`${fold ? "상세정보 접기" : "상세정보 펼쳐보기"}`}
        onClick={() => setFold((prev) => !prev)}
        styleType="blackHover"
        styles="w-[22.5rem] h-[80px] absolute left-[50%] ml-[-11.25rem] bottom-[50px] mx-auto flex justify-center items-center z-[999999] text-[1.2rem] font-light"
      >
        <p className="ml-2 text-[1.8rem]">
          {fold ? <BsCaretUp /> : <BsCaretDown />}
        </p>
      </Button>
    </div>
  );
}
