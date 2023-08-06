import React from "react";
import { GoX } from "react-icons/go";

export default function Modal({ user, onClose, children }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-black bg-opacity-60 fixed top-0 left-0 z-[999999999] flex justify-center items-center">
      <div className="w-[40%] bg-white rounded-lg overflow-hidden">
        <div className="w-full p-4 box-border flex justify-center items-center bg-[#c9c9c9] text-[#fff]">
          <button className="mr-6 text-[1.6rem]" onClick={onClose}>
            <GoX />
          </button>
          <p>{`${
            user === null ? "회원" : user.displayName + "해피"
          }님💖, 구매 상품은 어떠셨나요? 다른 해피님들께 구매후기를 전해주세요!`}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
