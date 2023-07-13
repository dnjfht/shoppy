import React from "react";

export default function MainSlider() {
  return (
    <div className="relative">
      <img
        src={process.env.PUBLIC_URL + "/image/banner/mainBanner1.png"}
        alt="banner"
      />
    </div>
  );
}
