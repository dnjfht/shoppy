import React from "react";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewImgSlider({ autoplay = true, filteredReviews }) {
  const totalSlides = Math.min(8, filteredReviews.length); // 최대 8개의 슬라이드
  const showArrows = filteredReviews.length >= 1; // 리뷰가 2개 이상일 때 화살표 표시

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: totalSlides,
    slidesToScroll: 1,
    slidesPreRow: 1,
    autoplay: Boolean(autoplay),
    autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    nextArrow: showArrows && <NextArrow />,
    prevArrow: showArrows && <PrevArrow />,
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
          <div className="w-full pr-2">
            <img
              className="w-full h-[167px] object-cover object-top"
              src={process.env.PUBLIC_URL + `/../${review.image}`}
              alt="review_img"
            />
          </div>
        ))}
      </Slider>
    </>
  );
}
