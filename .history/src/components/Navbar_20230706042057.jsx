import { PiCakeFill } from "react-icons/pi";
import { LiaBarsSolid } from "react-icons/lia";

export default function Navbar() {
  return (
    <div className="w-full border-b-[1px] border-solid border-[#e5e4e4]">
      <div>
        <LiaBarsSolid />
      </div>
      <div className="flex">
        <PiCakeFill />
        <p>Birthday Party</p>
      </div>
    </div>
  );
}
