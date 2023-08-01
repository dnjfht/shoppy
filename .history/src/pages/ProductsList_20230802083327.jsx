import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

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
      .then((res) => res.data.items);
  });

  return (
    <div className="w-full text-[1.875rem]">
      <div className="w-[1400px] mx-auto">
        <h1>
          {params === "All"
            ? "All"
            : params === "Women"
            ? "Women"
            : params === "Men"
            ? "Men"
            : "Shoes"}
        </h1>

        {isLoading && "Loading..."}
        {error && "Occured error...!"}

        <ul>
          {/* type "All" filter */}
          {items &&
            params === "All" &&
            items?.products?.map((item, index) => {
              return <ProductCard key={item.id} item={item} index={index} />;
            })}

          {/* type "Woman" filter */}
          {items &&
            params === "Woman" &&
            items?.products
              ?.filter((item) => {
                return item.type.includes("Woman");
              })
              ?.map((item, index) => {
                return <ProductCard key={item.id} item={item} index={index} />;
              })}

          {/* type "Man" filter */}
          {items &&
            params === "Man" &&
            items?.products
              ?.filter((item) => {
                return item.type.includes("Man");
              })
              ?.map((item, index) => {
                return <ProductCard key={item.id} item={item} index={index} />;
              })}

          {/* type "Shoes" filter */}
          {items &&
            params === "Shoes" &&
            items?.products
              ?.filter((item) => {
                return item.type.includes("Shoes");
              })
              ?.map((item, index) => {
                return <ProductCard key={item.id} item={item} index={index} />;
              })}
        </ul>
      </div>
    </div>
  );
}
