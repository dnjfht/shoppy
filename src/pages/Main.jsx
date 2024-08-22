import MainSlider from "../components/slider/MainSlider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CategoryItems from "../components/Main/CategoryItems";

export default function Main() {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: items,
  } = useQuery(["items"], async () => {
    return axios //
      .get("/data/Product.json") //
      .then((res) => res.data.items);
  });

  const comment = isLoading ? "Loading..." : error ? "Occured error...!" : null;

  const newItems = items?.products
    ?.filter((item) => item.banner.includes("new"))
    ?.slice(0, 8);
  const bestItems = items?.products
    ?.filter((item) => item.banner.includes("best"))
    ?.slice(0, 8);
  const allItems = items?.products?.slice(0, 20);

  return (
    <div className="w-full">
      <MainSlider />

      <div className="w-full max-w-[90%] mx-auto md:py-20 3sm:py-12 flex flex-col">
        {comment}

        <CategoryItems
          title="NEW ITEMS"
          items={newItems}
          onClick={() => {
            navigate("/products/new");
          }}
        />
        <CategoryItems
          title="BEST ITEMS"
          items={bestItems}
          onClick={() => {
            navigate("/products/best");
          }}
          styles="md:mt-40 3sm:mt-28"
        />

        <div className="mt-40">
          <img
            className="rounded-lg cursor-pointer"
            src={process.env.PUBLIC_URL + "./image/banner/eventBanner.png"}
            alt="event_banner"
          />
        </div>

        <CategoryItems
          title="ITEMS"
          items={allItems}
          onClick={() => {
            navigate("/products/All");
          }}
          styles="md:mt-40 3sm:mt-28"
        />
      </div>
    </div>
  );
}
