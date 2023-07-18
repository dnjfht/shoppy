import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function NewProduct() {
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

      {items && (
        <ul>
          {items.products.map((item) => {
            return (
              <li>
                <img
                  src={process.env.PUBLIC_URL + `${item.image}`}
                  alt="bannerImg"
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
