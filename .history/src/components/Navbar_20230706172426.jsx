import { PiCakeFill } from "react-icons/pi";
import { LiaBarsSolid } from "react-icons/lia";

export default function Navbar() {
  return (
    <div className="w-full h-[130px] bg-red-400">
      <ul className="flex items-center">
        <li>
          <LiaBarsSolid />
        </li>
        <li className="flex">
          <PiCakeFill />
          <p>Birthday Party</p>
        </li>
      </ul>

      <form>
        <input type="text" />
      </form>
    </div>
  );
}
