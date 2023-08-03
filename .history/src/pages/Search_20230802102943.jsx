import React, { useState } from "react";
import { GoX } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

export default function Search() {
  const [text, setText] = useState("");
  const [searchToolkits, setSearchToolkits] = useState([]);
  const [errorMessage, setErrorMessage] = useState("검색결과가 없습니다.");

  const handleDeleteTitle = () => {
    setText("");
  };

  const handleSearchToolkit = (e) => {
    e.preventDefault();

    const trimmedText = text.trim();

    if (trimmedText !== "") {
      setSearchToolkits(
        toolkits.filter((toolkit) => {
          return (
            toolkit.title.includes(text) || toolkit.description.includes(text)
          );
        })
      );

      if (searchToolkits.length === 0) {
        setErrorMessage("검색결과가 없습니다.");
      }
    } else if (trimmedText == "" || searchToolkits.length === 0) {
      setSearchToolkits([]);
      setErrorMessage("검색결과가 없습니다.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full h-[780px] mt-[130px] my-custom-bg-class bg-cover bg-center bg-fixed bg-no-repeat text-white flex flex-col justify-center items-center">
        <h1 className="text-[5rem]">The 이상</h1>
        <p className="text-[1.7rem] mt-[-10px] mb-24">
          이상한 사회를 이상적인 사회로
        </p>

        <form onSubmit={handleSearchToolkit} className="w-2/5 relative">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="w-full p-8 bg-[rgba(0,0,0,0.2)] border-[2px] border-solid border-white text-[1.2rem] text-white outline-none placeholder:text-[1.2rem] placeholder:text-[rgba(255,255,255,0.6)]"
            type="text"
            value={text}
            placeholder="검색어를 입력하세요."
          />

          <button
            onClick={handleDeleteTitle}
            className={`${
              text.length > 0 ? "opacity-1" : "opacity-0"
            } text-[2.4rem] absolute right-20 top-[30%] transition-all duration-700`}
            type="button"
          >
            <GoX />
          </button>

          <button
            type="submit"
            className="text-[2.4rem] absolute right-7 top-[30%]"
          >
            <CiSearch />
          </button>
        </form>
      </div>
      <div className="w-[1400px] mx-auto"></div>
    </div>
  );
}
