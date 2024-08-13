import Products from "./Products";

export default function BestProduct({ items }) {
  return (
    <div className="py-10 text-center">
      <h1 className="mb-10 font-semibold">Best Items</h1>

      <Products
        items={items?.products.filter((item) => item.banner.includes("best"))}
      />
    </div>
  );
}
