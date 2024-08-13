// ProductCard component들이 모아 리스트로 만든 것.

import ProductCard from "./ProductCard";

export default function Products({ items, styles }) {
  return (
    <ul
      className={`${styles} grid justify-between grid-cols-1 gap-4 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2`}
    >
      {items?.map((item) => (
        <ProductCard item={item} key={item.id} />
      ))}
    </ul>
  );
}
