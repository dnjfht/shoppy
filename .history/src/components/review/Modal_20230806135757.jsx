import React from "react";
import BasicRating from "./BasicRating";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <BasicRating />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
