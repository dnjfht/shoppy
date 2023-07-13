import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
