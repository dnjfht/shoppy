import React from "react";

export default function Modal({ onClose, children }) {
  return (
    <div className="w-[100vw] h-[100vh] bg-black bg-opacity-40 fixed top-0 left-0 z-[999999999]">
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
