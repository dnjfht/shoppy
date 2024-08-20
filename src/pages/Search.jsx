import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Products from "../components/product/Products";
import Button from "../components/button/Button";
import LabelInput from "../components/input/LabelInput";
import TypeInput from "../components/input/TypeInput";
import NumInput from "../components/input/NumInput";

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
    // 빈칸 체크 및 가격 유효성 검사
    if (searchInput.trim().length === 0 || isNaN(minPrice) || isNaN(maxPrice)) {
      alert("빈 칸이 존재하면 검색이 불가능합니다.");
      return;
    }

    // 입력된 검색어에서 공백 제거
    const normalizedInput = searchInput.trim().replace(/\s+/g, "");
    const regex = new RegExp(normalizedInput, "i");

    const filteredProducts = items.filter((item) => {
      // 제품 제목에서 공백 제거
      const normalizedTitle = item.title.replace(/\s+/g, "");
      // 공백이 제거된 제목과 검색어 비교
      const titleMatch = regex.test(normalizedTitle);
      const priceMatch =
        (minPrice === 0 || item.salePrice >= minPrice) &&
        (maxPrice === 0 || item.salePrice <= maxPrice);

      return titleMatch && priceMatch;
    });

    setFilteredProducts(filteredProducts);
  };

  const comment = isLoading
    ? "Loading..."
    : error
    ? "An error has occurred...!"
    : filteredProducts?.length === 0
    ? "검색결과가 없습니다.\n정확한 검색어 인지 확인하시고 다시 검색해 주세요."
    : `총 ${filteredProducts?.length}개의 상품이 검색되었습니다.`;

  return (
    <div className="relative w-full">
      <div className="w-full md:h-[780px] 3sm:h-[520px] bg-[rgba(0,0,0,0.5)] absolute top-0 left-0" />
      <div className="w-full md:h-[780px] 3sm:h-[520px] mt-[130px] my-custom-bg-class bg-cover bg-center bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="sm:text-[5rem] 3sm:text-[4rem] z-[999]">Search</h1>

        <div className="w-full md:max-w-[60%] 3sm:max-w-[90%] md:mt-20 3sm:mt-6 z-[999]">
          <LabelInput
            htmlFor="searchTitle"
            text="상품명"
            divStyle="w-full mb-7 flex items-center justify-between"
            labelStyle="w-[20%] lg:text-[1.4rem] sm:text-[1.2rem]"
          >
            <TypeInput
              id="searchTitle"
              placeholder="상품명을 입력하세요."
              text={searchInput}
              setText={setSearchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
              divStyles="w-[80%] h-full"
              inputStyles="md:px-4 3sm:px-2 md:py-6 3sm:py-4 md:text-[1.1rem] 3sm:text-[0.9rem] md:placeholder:text-[1rem] 3sm:placeholder:text-[0.8rem]"
              deleteButtonStyle="md:w-10 3sm:w-6 md:h-10 3sm:h-6 md:top-5 3sm:top-4 md:right-5 3sm:right-4"
              styleType="search"
            />
          </LabelInput>

          <LabelInput
            htmlFor="searchPrice"
            text="판매가격대"
            divStyle="w-full mb-10 flex items-center justify-between"
            labelStyle="w-[20%] lg:text-[1.4rem] sm:text-[1.2rem]"
          >
            <div className="w-[80%] flex items-center gap-x-2">
              <NumInput
                id="searchPrice"
                placeholder="원하시는 최소가격을 입력하세요."
                text={minPrice}
                setText={setMinPrice}
                onChange={(e) => {
                  setMinPrice(parseInt(e.target.value));
                }}
                inputStyles="w-[48%] md:px-4 3sm:px-2 md:py-6 3sm:py-4 3sm:py-4 md:text-[1.1rem] 3sm:text-[0.9rem] md:placeholder:text-[1rem] 3sm:placeholder:text-[0.8rem]"
                styleType="search"
              />

              <p className="text-[1.4rem]">~</p>

              <NumInput
                id="searchPrice"
                placeholder="원하시는 최대가격을 입력하세요."
                text={maxPrice}
                setText={setMaxPrice}
                onChange={(e) => {
                  setMaxPrice(parseInt(e.target.value));
                }}
                inputStyles="w-[48%] md:px-4 3sm:px-2 md:py-6 3sm:py-4 3sm:py-4 md:text-[1.1rem] 3sm:text-[0.9rem] md:placeholder:text-[1rem] 3sm:placeholder:text-[0.8rem]"
                styleType="search"
              />
            </div>
          </LabelInput>

          <Button
            value="상품 검색하기"
            onClick={searchProducts}
            styleType="whiteHover"
            styles="w-full md:py-6 3sm:py-4 md:text-[1rem] 3sm:text-[0.9rems]"
          />
        </div>
      </div>

      <div className="w-full max-w-[90%] mx-auto">
        <p
          className={`${
            filteredProducts?.length > 0 ? "" : "text-center"
          } md:text-[0.9rem] 3sm:text-[0.8rem] mt-10 whitespace-pre-wrap`}
        >
          {comment}
        </p>

        <Products
          items={filteredProducts}
          styles={`${filteredProducts?.length === 0 ? "hidden" : "block"} mt-5`}
        />
      </div>
    </div>
  );
}
