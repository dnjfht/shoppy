import Button from "../button/Button";
import Products from "../product/Products";

export default function CategoryItems({ title, items, onClick, styles }) {
  return (
    <div className={`${styles} w-full text-center`}>
      <h1 className="text-[1.875rem] font-semibold mb-10">{title}</h1>

      <Products items={items} />

      <Button
        value="더보기"
        onClick={onClick}
        styleType="hover"
        styles="sm:w-44 3sm:w-32 mt-6 sm:text-[0.875rem] 3sm:text-[0.75rem]"
      />
    </div>
  );
}
