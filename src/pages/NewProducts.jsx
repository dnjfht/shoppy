import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NewProduct from "../components/product/NewProduct";

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
  console.log(items);

  return (
    <div className="w-full text-[1.875rem]">
      <div className="w-[1400px] pt-32 mx-auto">
        {isLoading && "Loading..."}
        {error && "Occured error...!"}

        {items && <NewProduct items={items} />}
      </div>
    </div>
  );
}
