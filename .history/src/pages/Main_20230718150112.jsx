import React from "react";
import MainSlider from "../components/MainSlider";
import NewProduct from "../components/NewProduct";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
      <NewProduct />
    </div>
  );
}
