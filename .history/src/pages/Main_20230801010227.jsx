import React from "react";
import MainSlider from "../components/MainSlider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export function shorteningStr(comment, num) {
  return comment.slice(0, num) + "...";
}

export default function Main() {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.items);
  });

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <MainSlider />

      {isLoading && "Loading..."}
      {error && "Occured error...!"}

      {items && (
        <div className="w-[1400px] mx-auto py-20 flex flex-col">
          <div className="w-full text-center ">
            <h1 className="text-[1.875rem] font-semibold mb-10">NEW ITEMS</h1>
            <ul className="flex [&>*:last-child]:mr-0">
              {items.products
                .filter((item) => item.banner.includes("new"))
                .slice(0, 8)
                .map((item) => {
                  return (
                    <li className="w-[24%] mr-[1.333%] relative cursor-pointer">
                      <div className="w-full group">
                        <div className="w-12 h-12 rounded-full bg-black flex justify-center items-center absolute top-2 left-2">
                          <p className="text-white text-[0.9rem]">
                            {item.type}
                          </p>
                        </div>

                        <img
                          className="w-full object-fit rounded-lg"
                          src={process.env.PUBLIC_URL + `${item.image}`}
                          alt="img"
                        />

                        <div
                          onClick={() => {
                            navigate(`/products/detail/${item.id}`);
                          }}
                          className="group-hover:h-14 group-hover:shadow-[0_-14px_12px_-2px_rgba(0,0,0,0.1)] absolute bottom-[24%] w-full h-0 bg-[rgba(0,0,0,0.94)] rounded-b-lg flex justify-center items-center transition-all duration-700 overflow-hidden"
                        >
                          <p className="text-[0.9rem] text-white">구매하기</p>
                        </div>
                      </div>

                      <div className="py-6">
                        <p className="text-[1rem] font-semibold">
                          {item.title}
                        </p>
                        <div className="mt-5 flex justify-center items-center">
                          <p className="mr-2 text-[0.875rem] text-gray-400 line-through">
                            {attach_won(item.price)}
                          </p>

                          <p className="mr-2 text-[0.875rem] text-gray-400">
                            <LiaLongArrowAltRightSolid />
                          </p>

                          <p className="text-[1rem] text-[#f00]">
                            {attach_won(item.salePrice)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>

            <button className="w-44 py-3 bg-[#000000] mt-6 rounded-lg text-[0.875rem] text-white">
              더보기
            </button>
          </div>

          <div>
            {items.products
              .filter((item) => item.banner.includes("best"))
              .slice(0, 4)
              .map((item) => {
                return (
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + `${item.image}`}
                      alt="img"
                    />
                    <p>{item.title}</p>
                  </div>
                );
              })}
          </div>

          <div>
            {items.products.map((item) => {
              return (
                <div>
                  <img
                    src={process.env.PUBLIC_URL + `${item.image}`}
                    alt="img"
                  />
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// 가격 뒤에 원 붙이기 + 세 자리마다 쉼표 추가하기
export const attach_won = (prc) => {
  // 숫자를 문자열로 변환하여 쉼표를 적용
  const commaPrice = prc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // 문자열을 문자열의 길이만큼 잘라낸 후 원 붙이기
  const attachWon = `${commaPrice.slice(0, commaPrice.length)}원`;
  return attachWon;
};
