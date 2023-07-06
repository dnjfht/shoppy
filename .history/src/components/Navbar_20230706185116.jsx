import { PiCakeFill } from "react-icons/pi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  return (
    <div className="w-11/12 h-[130px] mx-auto flex items-center justify-between fixed">
      <ul className="flex items-center text-[2.5rem]">
        <li className="flex items-center font-[chab]">
          <PiCakeFill />
          <p className="ml-2">Birthday Party</p>
        </li>
      </ul>

      <form className="w-3/12 relative">
        <input
          className="w-full h-[68px] px-10 box-border rounded-full border-[2px] border-solid border-black outline-none text-[1.1rem]"
          type="text"
          placeholder="검색어를 입력하세요."
        />
        <button type="submit" className="text-[2.2rem] absolute top-4 right-5">
          <CiSearch />
        </button>
      </form>

      <ul className="flex items-center text-[1.4rem]">
        <li className="mr-5">Products</li>
        <li className="mr-5">Carts</li>
        <li className="mr-5">
          <BiSolidMessageSquareEdit />
        </li>
        <li>Login</li>
      </ul>
    </div>
  );
}
