import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
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
    <div className="relative">
      <Slider {...settings}>
        {bannerImg.map((img) => {
          return (
            <div>
              <img
                src={process.env.PUBLIC_URL + `${img.image}`}
                alt="bannerImg"
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
