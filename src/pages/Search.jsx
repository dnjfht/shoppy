import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Products from "../components/product/Products";

import { GoX } from "react-icons/go";

export default function Search() {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.items.products);
  });

  const [searchInput, setSearchInput] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searchProducts = () => {
    if (searchInput.trim().length === 0 || isNaN(minPrice) || isNaN(maxPrice)) {
      alert("빈 칸이 존재하면 검색이 불가능합니다.");
      return;
    } else if (searchInput.trim().length !== 0) {
      const filteredProducts = items.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(searchInput);
        const priceMatch =
          (minPrice === 0 || item.salePrice >= minPrice) &&
          (maxPrice === 0 || item.salePrice <= maxPrice);
        return titleMatch && priceMatch;
      });
      setFilteredProducts(filteredProducts);
    }
  };

  return (
    <div className="relative w-full">
      <div className="w-full h-[780px] bg-[rgba(0,0,0,0.5)] absolute top-0 left-0" />
      <div className="w-full h-[780px] mt-[130px] my-custom-bg-class bg-cover bg-center bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[5rem] z-[999]">Search</h1>

        <div className="w-1/2 mt-20 z-[999]">
          <div className="relative flex items-center w-full mb-6">
            <label
              htmlFor="searchTitle"
              className="block w-[20%] text-[1.4rem]"
            >
              상품명
            </label>
            <input
              id="searchTitle"
              type="text"
              placeholder="상품명을 입력하세요."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value.toLowerCase());
              }}
              className="w-[80%] px-4 py-6 text-[1.1rem] placeholder:text-[1rem] placeholder:text-[#a5a5a5] bg-[rgba(0,0,0,0.6)] border-[2px] border-solid border-white"
            />

            <button
              type="button"
              onClick={() => setSearchInput("")}
              className={`${
                searchInput.length !== 0 ? "opacity-100" : "opacity-0"
              } w-10 h-10 bg-black rounded-full absolute top-5 right-5 flex items-center justify-center text-[1.4rem] transition-all duration-700`}
            >
              <GoX />
            </button>
          </div>

          <div className="flex items-center mb-10">
            <label
              htmlFor="searchPrice"
              className="block w-[20%] text-[1.4rem]"
            >
              판매가격대
            </label>
            <input
              id="searchPrice"
              type="number"
              placeholder="원하시는 최소가격을 입력하세요."
              value={minPrice}
              onChange={(e) => {
                setMinPrice(parseInt(e.target.value));
              }}
              className="w-[38%] px-4 py-6 mr-[1%] text-[1.1rem] placeholder:text-[1rem] placeholder:text-[#a5a5a5] bg-[rgba(0,0,0,0.6)] border-[2px] border-solid border-white"
            />
            <p className="text-[1.4rem]">~</p>
            <input
              id="searchPrice"
              type="number"
              placeholder="원하시는 최대가격을 입력하세요."
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(parseInt(e.target.value));
              }}
              className="w-[38%] px-4 py-6 ml-[1%] text-[1.1rem] placeholder:text-[1rem] placeholder:text-[#a5a5a5] bg-[rgba(0,0,0,0.6)] border-[2px] border-solid border-white"
            />
          </div>

          <button
            onClick={searchProducts}
            className="w-full py-6 bg-black rounded-lg bg-opacity-100 border-[1px] border-solid border-black hover:bg-opacity-0 hover:border-white transition-all duration-700"
          >
            상품 검색하기
          </button>
        </div>
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <div className="w-[1400px] mx-auto p-10">
        {`총 ${filteredProducts.length}개의 상품이 검색되었습니다.`}

        {/* 검색 결과 상품 목록 표시 */}
        {filteredProducts.length === 0 ? (
          <p className="text-[0.9rem] text-center mt-10">
            검색결과가 없습니다.
            <br />
            정확한 검색어 인지 확인하시고 다시 검색해 주세요.
          </p>
        ) : (
          <Products items={filteredProducts} styles="mt-5" />
        )}
      </div>
    </div>
  );
}
