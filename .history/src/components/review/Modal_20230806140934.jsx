import React from "react";
import BasicRating from "./BasicRating";

export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  console.log(isOpen, onClose);

  return (
    <div>
      <div>
        <BasicRating />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
