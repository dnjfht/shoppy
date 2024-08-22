import { useState } from "react";
import Button from "../button/Button";

import { BsCaretDown, BsCaretUp } from "react-icons/bs";

export default function DetailInfo({ detailImg }) {
  const [fold, setFold] = useState(false);

  return (
    <div
      className={`${
        fold
          ? "height-[auto]"
          : "md:h-[2650px] sm:h-[1300px] 2sm:h-[920px] 3sm:h-[640px]"
      } w-full md:py-12 sm:py-8 3sm:py-4 overflow-hidden relative`}
    >
      {detailImg?.map((img) => (
        <img
          className="object-cover w-full"
          src={process.env.PUBLIC_URL + `/../${img}`}
          alt="detail_img"
        />
      ))}

      <div className="w-[100%] h-[180px] bg-gradient-to-b from-transparent from-[6%] to-white to-[62%] absolute bottom-0" />
      <Button
        value={`${fold ? "상세정보 접기" : "상세정보 펼쳐보기"}`}
        onClick={() => setFold((prev) => !prev)}
        styleType="blackHover"
        styles="md:w-[22.5rem] sm:w-[18.5rem] 3sm:w-[14.5rem] md:h-20 sm:h-[4rem] 3sm:h-[3.2rem] absolute left-[50%] md:ml-[-11.25rem] sm:ml-[-9.25rem] 3sm:ml-[-7.25rem] bottom-[50px] mx-auto flex justify-center items-center z-[999999] md:text-[1.2rem] sm:text-[1rem] 3sm:text-[0.9rem] font-light"
      >
        <p className="ml-2 md:text-[1.8rem] sm:text-[1.5rem] 3sm:text-[1.2rem]">
          {fold ? <BsCaretUp /> : <BsCaretDown />}
        </p>
      </Button>
    </div>
  );
}
