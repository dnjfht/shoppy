import { BsChevronRight } from "react-icons/bs";

export default function NextArrow({ onClick }) {
  return (
    <>
      <div
        onClick={onClick}
        className="text-[rgba(255,255,255,0.6) sm:text-[4.4rem] 3sm:text-[3rem] absolute top-[42%] sm:right-[14%] 3sm:right-[4%] z-[9999999] cursor-pointer"
      >
        <BsChevronRight />
      </div>
    </>
  );
}
