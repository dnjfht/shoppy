// NewProducts component의 자식 component

import Products from "./Products";

export default function NewProduct({ items }) {
  return (
    <div
      className={`${
        items ? "block" : "hidden"
      } w-full md:pt-10 3sm:pt-4 text-center`}
    >
      <h1 className="mb-10 font-semibold md:text-[1.875rem] 3sm:text-[1.5rem]">
        New Items
      </h1>

      <Products
        items={items?.products?.filter((item) => item.banner.includes("new"))}
      />
    </div>
  );
}
