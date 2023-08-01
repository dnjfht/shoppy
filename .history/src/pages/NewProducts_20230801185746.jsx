import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import NewProduct from "../components/NewProduct";

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
      {isLoading && "Loading..."}
      {error && "Occured error...!"}

      {items && <NewProduct items={items} />}
    </div>
  );
}
