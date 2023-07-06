import { PiCakeFill } from "react-icons/pi";

export default function Navbar() {
  return (
    <div className="w-full border-b-[1px] border-solid border-[#e5e4e4]">
      <div className="flex">
        <PiCakeFill />
        <p>Birthday Party</p>
      </div>
    </div>
  );
}
