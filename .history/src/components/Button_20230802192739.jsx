import React from "react";

export default function Button({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-44 py-3 bg-[#000000] mt-6 rounded-lg text-[0.875rem] text-white"
      value={value}
    />
  );
}
