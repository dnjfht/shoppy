import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex justify-center items-center">
      <img src={photoURL} alt={displayName} />
      <span>{displayName}</span>
    </div>
  );
}
