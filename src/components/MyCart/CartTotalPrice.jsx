// cart에 담긴 총 금액

import { attach_won } from "../../constants/constants";

export default function CartTotalPrice({ totalPrice, totalCount }) {
  const deliveryCharge = totalPrice < 50000 ? 2500 : 0;

  return (
    <div className="w-full p-7 box-border bg-[#f7f7f7]">
      <div className="flex items-center justify-between w-full mb-3">
        <p className="w-[40%] text-[0.875rem] text-[#333]">총 상품금액</p>
        <div className="w-[60%] text-right">
          <p className="text-[1rem] text-[#333] font-semibold">
            {attach_won(totalPrice)}
          </p>
          <p className="text-[0.875rem]">{`(${totalCount}개)`}</p>
        </div>
      </div>

      <div className="w-full pb-6 border-b-[1px] border-solid border-[#282828] flex justify-between items-center">
        <p className="w-[40%] text-[0.875rem] text-[#333]">총 배송비</p>

        <p className="w-[60%] text-[1rem] text-[#333] font-semibold text-right">
          {attach_won(deliveryCharge)}
        </p>
      </div>

      <div className="w-full mt-6 font-semibold">
        <p className="w-full text-[1rem] text-[#333]">결제예정금액</p>
        <p className="w-full text-[1.5rem] text-[#f57778]">
          {attach_won(totalPrice + deliveryCharge)}
        </p>
      </div>
    </div>
  );
}
