import React from "react";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  console.log(isOpen, onClose);

  return (
    <div>
      <div>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}