import React from "react";
import BasicRating from "./BasicRating";

export default const Modal = ({ isOpen, onClose, children }) => {
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
