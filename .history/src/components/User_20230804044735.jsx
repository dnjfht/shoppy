import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex">
      <img src={photoURL} alt={displayName} />
      <span>{displayName}</span>
    </div>
  );
}
