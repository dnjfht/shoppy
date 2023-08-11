import React from "react";

export default function Modal({ user, onClose, children }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-black bg-opacity-60 fixed top-0 left-0 z-[999999999] flex justify-center items-center">
      <div className="w-[40%] p-5 box-border bg-white rounded-lg">
        <div className="w-full flex p-4 box-border">
          <button onClick={onClose}>Close</button>
          <p>{`${
            user === null ? "회원" : user.displayName + "해피"
          }님💖, 구매 상품은 어떠셨나요? 다른 해피님들께 구매후기를 전해주세요!`}</p>
        </div>
        {children}
      </div>
    </div>
  );
}