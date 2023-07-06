import { PiCakeFill } from "react-icons/pi";
import { LiaBarsSolid } from "react-icons/lia";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

export default function Navbar() {
  return (
    <div className="w-full h-[130px] flex items-center justify-between">
      <ul className="flex items-center text-[3rem]">
        <li>
          <LiaBarsSolid />
        </li>
        <li className="flex items-center ml-5 font-[chab]">
          <PiCakeFill />
          <p className="ml-2">Birthday Party</p>
        </li>
      </ul>

      <form className="w-4/12 bg-red-500">
        <input className="w-full border-[1px] border-solid" type="text" />
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
