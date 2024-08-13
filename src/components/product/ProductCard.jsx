// 가장 작은 단위인 ProductCard component

import { useNavigate } from "react-router-dom";
import { attach_won } from "../../constants/constants";
import Button from "../button/Button";

import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export default function ProductCard({ item }) {
  const navigate = useNavigate();

  return (
    <li className="relative mb-6 text-center list-none cursor-pointer">
      <div className="relative w-full group">
        <ul className="px-4 py-3 rounded-full bg-black flex flex-wrap justify-between items-center absolute top-2 left-2 [&>*:last-child]:mr-0 [&>*:last-child]:pr-0 [&>*:last-child]:border-none">
          {item.type.map((t, index) => (
            <li
              key={index}
              className="text-white text-[0.9rem] pr-2 mr-2 border-r-[1px] border-solid border-white"
            >
              {t}
            </li>
          ))}
        </ul>

        <img
          className="w-full rounded-lg object-fit"
          src={process.env.PUBLIC_URL + `/../${item.image}`}
          alt="img"
        />

        <Button
          value="구매하기"
          onClick={() => {
            navigate(`/products/detail/${item.id}`, { state: { item } });
          }}
          styleType="blackBg"
          styles="rounded-b-lg group-hover:h-14 group-hover:shadow-[0_-14px_12px_-2px_rgba(0,0,0,0.1)] absolute bottom-0 w-full h-0 flex justify-center items-center transition-all duration-700 overflow-hidden text-[0.9rem] text-white"
        />
      </div>

      <div className="py-6 sm:text-center 3sm:text-left">
        <p className="font-semibold">{item.title}</p>

        <p className="mt-2 sm:text-[0.875rem] 3sm:text-[0.75rem] text-[#484848] line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center mt-4 sm:justify-center 3sm:justify-start">
          <p className="mr-2 sm:text-[0.875rem] 3sm:text-[0.76rem] text-gray-400 line-through">
            {attach_won(item.price)}
          </p>

          <p className="mr-2 sm:text-[0.875rem] 3sm:text-[0.76rem] text-gray-400">
            <LiaLongArrowAltRightSolid />
          </p>

          <p className="sm:text-[1rem] 3sm:text-[0.9rem] text-[#f00]">
            {attach_won(item.salePrice)}
          </p>
        </div>
      </div>
    </li>
  );
}
