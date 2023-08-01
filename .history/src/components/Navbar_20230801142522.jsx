import { useEffect, useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
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

  const category = ["All", "Women", "Men", "Shoes"];

  return (
    <div
      className={`${
        scrollHeight >= 140
          ? "bg-[rgba(255,255,255,100)] shadow-lg"
          : "bg-[rgba(255,255,255,0)]"
      } w-full h-[130px] fixed left-0 right-0 z-[999999] transition-all duration-700 hover:bg-[rgba(255,255,255,100)] hover:shadow-lg cursor-pointer`}
    >
      <div className="w-10/12 h-full mx-auto flex items-center justify-between">
        <ul className="flex items-center text-[2.5rem] font-[InkLipquid]">
          <li
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <img
              className="w-[5rem] object-cover"
              src={process.env.PUBLIC_URL + "/image/logo.png"}
              alt="logo"
            />
            <p className="ml-3">Birthday Party</p>
          </li>
        </ul>

        <ul className="w-2/5 flex items-center justify-between text-[1.2rem]">
          <li
            onClick={() => {
              navigate("/products/new");
            }}
            className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.1rem] after:bg-[#282828] hover:after:w-full transition-all duration-700"
          >
            New
          </li>
          <li
            onClick={() => {
              navigate("/products/best");
            }}
            className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.1rem] after:bg-[#282828] hover:after:w-full transition-all duration-700"
          >
            Best
          </li>

          {category?.map((c) => {
            return (
              <li
                onClick={() => {
                  navigate("/products");
                }}
                className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.1rem] after:bg-[#282828] hover:after:w-full transition-all duration-700"
              >
                {c}
              </li>
            );
          })}
        </ul>

        <ul className="flex items-center text-[1.2rem]">
          <li className="mr-7">
            <FiSearch />
          </li>
          <li
            onClick={() => {
              navigate("/carts");
            }}
            className="mr-7"
          >
            Carts
          </li>
          <li className="mr-7">
            <BiSolidMessageSquareEdit />
          </li>
          <li>Login</li>
        </ul>
      </div>
    </div>
  );
}
