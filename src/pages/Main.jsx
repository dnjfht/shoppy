import React from "react";
import MainSlider from "../components/slider/MainSlider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import Button from "../components/button/Button";

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
          {/* New Items 영역 */}
          <div className="w-full text-center ">
            <h1 className="text-[1.875rem] font-semibold mb-10">NEW ITEMS</h1>
            <ul className="flex flex-wrap [&>*:last-child]:mr-0">
              {items &&
                items?.products
                  ?.filter((item) => item.banner.includes("new"))
                  ?.slice(0, 8)
                  ?.map((item, index) => {
                    return (
                      <ProductCard key={item.id} item={item} index={index} />
                    );
                  })}
            </ul>

            <Button
              value="더보기"
              onClick={() => {
                navigate("/products/new");
              }}
            />
          </div>

          {/* Best Items 영역 */}
          <div className="w-full mt-40 text-center">
            <h1 className="text-[1.875rem] font-semibold mb-10">BEST ITEMS</h1>
            <ul className="flex flex-wrap [&>*:last-child]:mr-0">
              {items &&
                items?.products
                  ?.filter((item) => item.banner.includes("best"))
                  ?.slice(0, 8)
                  ?.map((item, index) => {
                    return (
                      <ProductCard key={item.id} item={item} index={index} />
                    );
                  })}
            </ul>

            <Button
              value="더보기"
              onClick={() => {
                navigate("/products/best");
              }}
            />
          </div>

          {/* event banner 영역 */}
          <div className="mt-40">
            <img
              className="rounded-lg cursor-pointer"
              src={process.env.PUBLIC_URL + "./image/banner/eventBanner.png"}
              alt="event_banner"
            />
          </div>

          {/* Items 영역 */}
          <div className="w-full mt-40 text-center">
            <h1 className="text-[1.875rem] font-semibold mb-10">ITEMS</h1>
            <ul className="flex flex-wrap [&>*:last-child]:mr-0">
              {items &&
                items?.products?.slice(0, 20)?.map((item, index) => {
                  return (
                    <ProductCard key={item.id} item={item} index={index} />
                  );
                })}
            </ul>

            <Button
              value="더보기"
              onClick={() => {
                navigate(`/products/${All}`);
              }}
            />
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

export const shortString = (str, num) => {
  if (str.length > num) {
    return `${str.slice(0, num - 1)} ...`;
  }
  return str;
};

const All = "All";
