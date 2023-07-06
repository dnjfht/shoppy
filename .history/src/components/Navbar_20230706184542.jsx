import { PiCakeFill } from "react-icons/pi";
import { LiaBarsSolid } from "react-icons/lia";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

export default function Navbar() {
  return (
    <div className="w-full h-[130px] flex items-center justify-between">
      <ul className="flex items-center text-[2.5rem]">
        <li>
          <LiaBarsSolid />
        </li>
        <li className="flex items-center ml-6 font-[chab]">
          <PiCakeFill />
          <p className="ml-2">Birthday Party</p>
        </li>
      </ul>

      <form className="w-3/12">
        <input
          className="w-full h-[68px] px-10 box-border rounded-full border-[2px] border-solid border-black outline-none text-[1rem]"
          type="text"
          placeholder="검색어를 입력하세요."
        />
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
