import { useEffect, useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [scrollHeight, setScrollHeight] = useState(0);

  function onScroll() {
    setScrollHeight(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`${
        scrollHeight >= 140
          ? "bg-[rgba(255,255,255,100)] shadow-lg"
          : "bg-[rgba(255,255,255,0)]"
      } w-full h-[130px] fixed left-0 right-0 z-[999999] transition-all duration-700 hover:bg-[rgba(255,255,255,100)] hover:shadow-lg cursor-pointer`}
    >
      <div className="w-10/12 h-full mx-auto flex items-center justify-between">
        <ul className="flex items-center text-[2.5rem]">
          <li
            onClick={() => navigate("/")}
            className="flex items-center font-[InkLipquid] cursor-pointer"
          >
            <img
              className="w-[5rem] object-cover"
              src={process.env.PUBLIC_URL + "/image/logo.png"}
              alt="logo"
            />
            <p className="ml-3">Birthday Party</p>
          </li>
        </ul>

        <ul>
          <li>All</li>
          <li>Women</li>
          <li>Men</li>
          <li>Shoes</li>
        </ul>

        <ul className="flex items-center text-[1.7rem] font-[InkLipquid]">
          <li className="mr-7">
            <CiSearch />
          </li>
          <li className="mr-7">Carts</li>
          <li className="mr-7">
            <BiSolidMessageSquareEdit />
          </li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
}