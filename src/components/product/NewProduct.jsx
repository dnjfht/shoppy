// NewProducts component의 자식 component

import Products from "./Products";

export default function NewProduct({ items }) {
  return (
    <div className={`${items ? "block" : "hidden"} w-full py-10 text-center`}>
      <h1 className="mb-10 font-semibold text-[1.875rem]">New Items</h1>

      <Products
        items={items?.products.filter((item) => item.banner.includes("new"))}
      />
    </div>
  );
}
