import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

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
    <div>
      <h1>New Items</h1>
    </div>
  );
}
