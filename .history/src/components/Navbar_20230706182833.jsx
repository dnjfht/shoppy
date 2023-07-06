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

      <form>
        <input type="text" />
      </form>

      <ul className="flex items-center text-[1.4rem]">
        <li>Products</li>
        <li>Carts</li>
        <li>
          <BiSolidMessageSquareEdit />
        </li>
        <li>Login</li>
      </ul>
    </div>
  );
}
