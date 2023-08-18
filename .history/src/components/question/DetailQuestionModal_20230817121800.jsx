import React from "react";
import { GoX } from "react-icons/go";

export default function DetailQuestionModal({ onClose, children }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-black bg-opacity-60 fixed top-0 left-0 z-[999999999] flex justify-center items-center">
      <div className="w-[40%] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-4 box-border flex items-center bg-[#282828] text-[#fff]">
          <button className="mr-20 text-[1.6rem]" onClick={onClose}>
            <GoX />
          </button>
          <p>문의사항을 남겨주세요!</p>
        </div>
        {children}
      </div>
    </div>
  );
}
