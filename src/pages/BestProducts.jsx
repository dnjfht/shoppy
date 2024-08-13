// Best Items page

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import BestProduct from "../components/product/BestProduct";

export default function NewProducts() {
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
      <div className="w-full max-w-[90%] pt-32 mx-auto">
        {isLoading && "Loading..."}
        {error && "Occured error...!"}

        <BestProduct items={items} />
      </div>
    </div>
  );
}
