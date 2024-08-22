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
  const comment = isLoading ? "Loading..." : error ? "Occured error...!" : null;

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
      <div className="w-full max-w-[90%] mx-auto md:pt-32 3sm:pt-28 pb-10 text-center">
        <h1 className="my-10 font-semibold md:text-[1.875rem] 3sm:text-[1.5rem]">
          {categoryTitle}
        </h1>

        {comment}

        <Products items={items} />
      </div>
    </div>
  );
}
