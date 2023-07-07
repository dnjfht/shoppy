import React from "react";

export default function Banner() {
  return (
    <div className="relative">
      <div className="w-full h-full bg-black opacity-60 absolute top-0 left-0"></div>
      <img
        src={process.env.PUBLIC_URL + "/image/mainBanner.png"}
        alt="banner"
      />
    </div>
  );
}
