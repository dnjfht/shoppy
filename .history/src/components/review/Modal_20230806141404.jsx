import React from "react";
import BasicRating from "./BasicRating";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  console.log(isOpen, onClose);

  return (
    <div>
      <div>
        <BasicRating />
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
}
