import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex justify-center items-center">
      <img className="w-1/2" src={photoURL} alt={displayName} />
      <span>{displayName}</span>
    </div>
  );
}
