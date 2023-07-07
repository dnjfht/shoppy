import { PiCakeFill } from "react-icons/pi";
import { LiaBarsSolid } from "react-icons/lia";

export default function Navbar() {
  return (
    <div className="w-full h-[130px] flex items-center justify-between">
      <ul className="flex items-center">
        <li>
          <LiaBarsSolid />
        </li>
        <li className="flex items-center ml-5 text-[3rem] font-[strawberry]">
          <PiCakeFill />
          <p className="ml-4">Birthday Party</p>
        </li>
      </ul>

      <form>
        <input type="text" />
      </form>
    </div>
  );
}