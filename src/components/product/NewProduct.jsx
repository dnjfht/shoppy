import Products from "./Products";

export default function NewProduct({ items }) {
  return (
    <div className="py-10 text-center">
      <h1 className="mb-10 font-semibold">New Items</h1>

      <Products
        items={items?.products.filter((item) => item.banner.includes("new"))}
      />
    </div>
  );
}
