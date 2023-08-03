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
    const filteredProducts = items.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(searchInput);
      const priceMatch =
        (minPrice === 0 || item.salePrice >= minPrice) &&
        (maxPrice === 0 || item.salePrice <= maxPrice);
      return titleMatch && priceMatch;
    });
    setFilteredProducts(filteredProducts);
  };

  console.log(searchInput, minPrice, maxPrice);
  return (
    <div className="w-full">
      <div className="w-full h-[780px] mt-[130px] my-custom-bg-class bg-cover bg-center bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[4.2rem]">Search</h1>

        <div>
          <div>
            <label htmlFor="searchTitle">상품명</label>
            <input
              id="searchTitle"
              type="text"
              placeholder="상품명을 입력하세요."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value.toLowerCase());
              }}
            />
          </div>

          <div className="flex">
            <label htmlFor="searchPrice">판매가격대</label>
            <input
              id="searchPrice"
              type="number"
              placeholder="원하시는 최소가격을 입력하세요."
              value={minPrice}
              onChange={(e) => {
                setMinPrice(parseInt(e.target.value));
              }}
            />
            <p>~</p>
            <input
              id="searchPrice"
              type="number"
              placeholder="원하시는 최대가격을 입력하세요."
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(parseInt(e.target.value));
              }}
            />
          </div>

          <button
            onClick={searchProducts}
            className="w-full py-4 bg-black rounded-lg"
          >
            상품 검색하기
          </button>
        </div>
      </div>

      {isLoading && "Loading..."}
      {error && "An error has occurred...!"}

      <div className="w-[1400px] mx-auto">
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
