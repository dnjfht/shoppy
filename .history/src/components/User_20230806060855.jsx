import React from "react";

export default function User({ userInfo }) {
  return (
    <div className="w-full flex justify-center items-center">
      <img
        className="xl:w-10 lg:w-14 w-18 object-cover rounded-full"
        src={userInfo.photoURL}
        alt={userInfo.displayName}
      />
      <span className="2xl:block ml-2 text-[0.9375rem] hidden">
        {userInfo.displayName}
      </span>
    </div>
  );
}
