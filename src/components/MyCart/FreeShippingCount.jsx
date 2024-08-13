// 무료 배송비까지 남은 금액

import { attach_won } from "../../constants/constants";

import { BsBox2 } from "react-icons/bs";

export default function FreeShippingCount({ totalPrice, progressBarStyle }) {
  return (
    <div
      className={`${
        totalPrice < 50000 ? "block" : "hidden"
      } w-full px-6 py-8 box-border border-b-[1px] border-solid border-[#e5e5e5]`}
    >
      <div className="mb-3 flex justify-center items-center text-[1rem] text-[#333] font-semibold">
        <p className="text-[0.9rem]">
          <BsBox2 />
        </p>
        <p className="ml-1 tracking-tighter">
          무료배송 5만원까지
          <span className="text-[#f57778]">
            {attach_won(50000 - totalPrice)}
          </span>
          남았습니다!
        </p>
      </div>

      <div className="w-full h-[3px] bg-[#e5e5e5]">
        <div
          style={progressBarStyle}
          className="h-full bg-[#f57778] transition-all duration-700"
        />
      </div>
    </div>
  );
}
