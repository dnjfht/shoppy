import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import BestProduct from "../components/BestProduct";

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
    <div>
      {isLoading && "Loading..."}
      {error && "Occured error...!"}

      {items && <BestProduct items={items} />}
    </div>
  );
}
