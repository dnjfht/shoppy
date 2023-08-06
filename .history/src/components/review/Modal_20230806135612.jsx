import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <button>Close</button>
      </div>
    </div>
  );
};
