import React from "react";

export default function Button({ value, onClick }) {
  return <button onClick={onClick} value={value} />;
}
