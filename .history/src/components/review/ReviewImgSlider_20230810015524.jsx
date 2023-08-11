import React, { useRef, useState } from "react";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewImgSlider({ autoplay = true, filteredReviews }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const detail = true;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: Boolean(autoplay),
    initialSlide: currentSlide, // 초기 슬라이드 설정
    autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    nextArrow: (
      <NextArrow
        detail={detail}
        onClick={() => sliderRef.current.slickNext()}
      />
    ),
    prevArrow: (
      <PrevArrow
        detail={detail}
        onClick={() => sliderRef.current.slickPrev()}
      />
    ),
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // 슬라이드 변경시 currentSlide 업데이트
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
    <div className="w-full">
      <div>
        <NextArrow onClick={() => sliderRef.current.slickNext()} />
        <PrevArrow onClick={() => sliderRef.current.slickPrev()} />
      </div>
      <Slider ref={sliderRef} {...settings}>
        {filteredReviews.map((review) => (
          <div className="w-full pr-2">
            <img
              className="w-full h-[167px] object-cover object-top"
              src={process.env.PUBLIC_URL + `/../${review.image}`}
              alt="review_img"
            />
            <p>{review.id}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}
