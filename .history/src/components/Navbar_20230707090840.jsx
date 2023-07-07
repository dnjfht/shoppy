import { PiCakeFill } from "react-icons/pi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-10/12 h-[130px] mx-auto flex items-center justify-between fixed left-0 right-0 z-[999999]">
      <ul className="flex items-center text-[2.5rem]">
        <li
          onClick={() => navigate("/")}
          className="flex items-center font-[InkLipquid] cursor-pointer text-[white]"
        >
          <img
            className="w-[5rem] object-cover"
            src={process.env.PUBLIC_URL + "/image/w-logo.png"}
            alt="logo"
          />
          <p className="ml-3">Birthday Party</p>
        </li>
      </ul>

      <form className="w-4/12 relative">
        <input
          className="w-full h-[68px] px-6 box-border bg-transparent rounded-full border-[2px] border-solid border-white outline-none text-[1.1rem] placeholder:text-[#eeeeee]"
          type="text"
          placeholder="검색어를 입력하세요."
        />
        <button
          type="submit"
          className="text-[2.2rem] text-[white] absolute top-4 right-5"
        >
          <CiSearch />
        </button>
      </form>

      <ul className="flex items-center text-[1.7rem] font-[InkLipquid] text-white">
        <li className="mr-7">Products</li>
        <li className="mr-7">Carts</li>
        <li className="mr-7">
          <BiSolidMessageSquareEdit />
        </li>
        <li>Login</li>
      </ul>
    </div>
  );
}
