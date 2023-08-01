import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

export default function ProductsList() {
  const params = useParams().listName;
  console.log(params);

  const {
    isLoading,
    error,
    data: items,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.items.products);
  });
  return (
    <div className="w-full">
      <div className="w-[1400px] mx-auto bg-red-400">
        <h1>
          {params === "All"
            ? "All"
            : params === "Women"
            ? "Women"
            : params === "Men"
            ? "Men"
            : "Shoes"}
        </h1>
      </div>
    </div>
  );
}
