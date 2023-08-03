import React, { useEffect, useState } from "react";
import { GoX } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "../components/ProductCard";

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
    if (searchInput.trim().length === 0) {
      alert("상품명을 입력해주세요.");
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

  console.log(searchInput, minPrice, maxPrice);
  return (
    <div className="w-full relative">
      <div className="w-full h-[780px] bg-[rgba(0,0,0,0.5)] absolute top-0 left-0" />
      <div className="w-full h-[780px] mt-[130px] my-custom-bg-class bg-cover bg-center bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[5rem] z-[999]">Search</h1>

        <div className="w-1/2 mt-20 z-[999]">
          <div className="w-full flex items-center mb-6">
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

      <div className="w-[1400px] mx-auto">
        {`총 ${filteredProducts.length}개의 상품이 검색되었습니다.`}

        {/* 검색 결과 상품 목록 표시 */}
        {filteredProducts.length === 0 ? (
          <p>일치하는 상품이 없습니다.</p>
        ) : (
          filteredProducts.map((item, index) => {
            return <ProductCard key={item.id} item={item} index={index} />;
          })
        )}
      </div>
    </div>
  );
}
