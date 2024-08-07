import React from "react";
import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/mypage");
      }}
      className="w-full flex justify-center items-center"
    >
      <img
        className={`${
          user.photoURL ? "block" : "hidden"
        } xl:w-10 lg:w-14 w-18 object-cover rounded-full`}
        src={user.photoURL}
        alt={user.displayName}
      />
      <img
        className={`${
          !user.photoURL ? "block" : "hidden"
        } xl:w-10 lg:w-14 w-18 object-cover rounded-full`}
        src={process.env.PUBLIC_URL + "/image/defaultImage.png"}
        alt={user.displayName}
      />
      <span className="2xl:block ml-2 text-[0.9375rem] hidden">
        {user.displayName}
      </span>
    </div>
  );
}
