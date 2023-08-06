import React from "react";

export default function Modal({ onClose, children }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-black bg-opacity-60 fixed top-0 left-0 z-[999999999] flex justify-center items-center">
      <div className="w-[40%] p-5 box-border bg-white rounded-lg">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
