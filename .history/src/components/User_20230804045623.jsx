import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="flex justify-center items-center">
      <img
        className="w-10 object-cover rounded-full"
        src={photoURL}
        alt={displayName}
      />
      <span className="ml-2 ">{displayName}</span>
    </div>
  );
}
