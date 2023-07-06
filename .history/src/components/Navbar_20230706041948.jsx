import { PiCakeFill } from "react-icons/pi";
import { HiBars3BottomLeft } from "react-icons/hib";

export default function Navbar() {
  return (
    <div className="w-full border-b-[1px] border-solid border-[#e5e4e4]">
      <div>
        <HiBars3BottomLeft />
      </div>
      <div className="flex">
        <PiCakeFill />
        <p>Birthday Party</p>
      </div>
    </div>
  );
}
