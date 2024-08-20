import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Products from "../components/product/Products";

export default function ProductsList() {
  const params = useParams().listName;
  const categoryTitle =
    params === "All"
      ? "All"
      : params === "Woman"
      ? "Woman"
      : params === "Man"
      ? "Man"
      : "Shoes";

  const { isLoading, error, data } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.items);
  });

  const items = data?.products?.filter((item) => {
    return params === "Woman"
      ? item.type.includes("Woman")
      : params === "Man"
      ? item.type.includes("Man")
      : params === "Shoes"
      ? item.type.includes("Shoes")
      : true;
  });

  return (
    <div className="w-full">
      <div className="w-full max-w-[90%] mx-auto pt-32 py-10 text-center">
        <h1 className="my-10 font-semibold text-[1.875rem]">{categoryTitle}</h1>

        {isLoading && "Loading..."}
        {error && "Occured error...!"}

        <Products items={items} />
      </div>
    </div>
  );
}
