import { PiCakeFill } from "react-icons/pi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-10/12 h-[130px] mx-auto flex items-center justify-between fixed left-0 right-0">
      <ul className="flex items-center text-[2.5rem]">
        <li
          onClick={() => navigate("/")}
          className="flex items-center font-[chab] cursor-pointer"
        >
          <img
            className="w-[100px]"
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="logo"
          />
          <p className="ml-2">Birthday Party</p>
        </li>
      </ul>

      <form className="w-3/12 relative">
        <input
          className="w-full h-[68px] px-6 box-border rounded-full border-[2px] border-solid border-black outline-none text-[1.1rem]"
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
