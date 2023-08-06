import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  console.log(isOpen, onClose);

  return (
    <div className="bg-red-500">
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
