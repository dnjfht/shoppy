import React from "react";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewImgSlider({ autoplay = true, filteredReviews }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: auto,
    slidesToScroll: 1,
    slidesPreRow: 1,
    autoplay: Boolean(autoplay),
    autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  return (
    <>
      <Slider {...settings}>
        {filteredReviews.map((review) => (
          <div>
            <img
              src={process.env.PUBLIC_URL + `/../${review.image}`}
              alt="review_img"
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
