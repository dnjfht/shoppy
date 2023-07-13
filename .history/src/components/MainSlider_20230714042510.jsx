import React from "react";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MainSlider({ autoplay = true }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: Boolean(autoplay),
    autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const {
    isLoading,
    error,
    data: bannerImg,
  } = useQuery(["bannerImg"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.banner);
  });

  console.log(bannerImg);

  return (
    <>
      {isLoading && "Loading..."}
      {error && "Occured error...!"}
      <Slider {...settings}>
        {bannerImg &&
          bannerImg.map((img) => {
            return (
              <div key={img.id}>
                <img
                  src={process.env.PUBLIC_URL + `${img.image}`}
                  alt="bannerImg"
                />
              </div>
            );
          })}
      </Slider>
    </>
  );
}
