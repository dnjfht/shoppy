import React from "react";

export default function User({ user: { photoURL, displayName } }) {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        className="xl:w-10 lg:w-14 w-1/2 object-cover rounded-full"
        src={photoURL}
        alt={displayName}
      />
      <span className="2xl:block ml-2 text-[0.9375rem] hidden">
        {displayName}
      </span>
    </div>
  );
}
