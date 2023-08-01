import React from "react";
import MainSlider from "../components/MainSlider";
import NewProduct from "../components/NewProduct";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import BestProduct from "../components/BestProduct";
import Products from "../components/Products";

export function shorteningStr(comment, num) {
  return comment.slice(0, num) + "...";
}

export default function Main() {
  const {
    isLoading,
    error,
    data: items,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.items);
  });

  return (
    <div className="w-full">
      <MainSlider />

      {isLoading && "Loading..."}
      {error && "Occured error...!"}

      {items && (
        <div className="w-[1400px] mx-auto flex flex-col">
          <div className="w-full text-center">
            <h1>NEW ITEMS</h1>
            <div className="flex">
            {items.products
              .filter((item) => item.banner.includes("new"))
              .slice(0, 4)
              .map((item) => {
                return (
                  <div className="w-[24%]">
                    <img
                      src={process.env.PUBLIC_URL + `${item.image}`}
                      alt="img"
                    />
                    <p>{item.title}</p>
                  </div>
                );
              })}
          </div>

          <div>
            {items.products
              .filter((item) => item.banner.includes("best"))
              .slice(0, 4)
              .map((item) => {
                return (
                  <div>
                    <img
                      src={process.env.PUBLIC_URL + `${item.image}`}
                      alt="img"
                    />
                    <p>{item.title}</p>
                  </div>
                );
              })}
          </div>

          <div>
            {items.products.map((item) => {
              return (
                <div>
                  <img
                    src={process.env.PUBLIC_URL + `${item.image}`}
                    alt="img"
                  />
                  <p>{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
