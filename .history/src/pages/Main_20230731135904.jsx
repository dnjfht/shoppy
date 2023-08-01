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
    <div>
      <MainSlider />

      {isLoading && "Loading..."}
      {error && "Occured error...!"}

      {items && (
        <>
          {items.products
            .filter((item) => item.banner.includes("new"))
            .slice(0, 4)
            .map((item) => {
              return (
                <div>
                  <img src={} alt="img"/>
                  <p>{item.title}</p>
                </div>
              )
            })}

          <BestProduct items={items} />
          <Products items={items} />
        </>
      )}
    </div>
  );
}
