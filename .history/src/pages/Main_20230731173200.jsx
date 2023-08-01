import React from "react";
import MainSlider from "../components/MainSlider";
import NewProduct from "../components/NewProduct";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BestProduct from "../components/BestProduct";
import Products from "../components/Products";

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

  return (
    <div className="w-full">
      <MainSlider />

      {isLoading && "Loading..."}
      {error && "Occured error...!"}

      {items && (
        <div className="w-[1400px] mx-auto py-20 flex flex-col">
          <div className="w-full text-center">
            <h1 className="text-[1.875rem] font-semibold mb-10">NEW ITEMS</h1>
            <ul className="flex [&>*:last-child]:mr-0">
              {items.products
                .filter((item) => item.banner.includes("new"))
                .slice(0, 4)
                .map((item) => {
                  return (
                    <li className="w-[24%] mr-[1.333%] relative">
                      <div>
                        <p className="absolute">{item.type}</p>
                      </div>

                      <img
                        className="w-full object-fit rounded-lg"
                        src={process.env.PUBLIC_URL + `${item.image}`}
                        alt="img"
                      />
                      <p>{item.title}</p>
                      <div>
                        <p>{attach_won(item.price)}</p>
                        <p>{attach_won(item.salePrice)}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
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