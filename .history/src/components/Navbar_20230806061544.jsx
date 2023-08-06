import { useEffect, useState } from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/firebase";
import { isLoggedIn } from "../utils/utils";
import User from "./User";

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

  const category = ["All", "Woman", "Man", "Shoes"];

  const onLogoutClick = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      return authService.signOut().then(() => {
        sessionStorage.clear(); // ?
        alert("로그아웃 되었습니다.");
        navigate("/", { replace: true });
      });
    } else {
      return;
    }
  };

  return (
    <div
      className={`${
        scrollHeight >= 140
          ? "bg-[rgba(255,255,255,100)] shadow-lg"
          : "bg-[rgba(255,255,255,0)]"
      } w-full h-[130px] fixed left-0 top-0 z-[999999] transition-all duration-700 hover:bg-[rgba(255,255,255,100)] hover:shadow-lg cursor-pointer`}
    >
      <div className="w-10/12 h-full mx-auto flex items-center justify-between">
        <ul className="flex items-center text-[2.5rem] font-[InkLipquid]">
          <li
            onClick={() => navigate("/")}
            className="flex items-center cursor-pointer"
          >
            <img
              className="xl:w-[5rem] md:w-[3.6rem] object-cover"
              src={process.env.PUBLIC_URL + "/image/logo.png"}
              alt="logo"
            />
            <p className="xl:text-[2.5rem] md:text-[1.6rem] ml-3">
              Birthday Party
            </p>
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

          {category?.map((c, index) => {
            return (
              <li
                onClick={() => {
                  navigate(`/products/${c}`);
                }}
                key={index}
                className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[0.1rem] after:bg-[#282828] hover:after:w-full transition-all duration-700"
              >
                {c}
              </li>
            );
          })}
        </ul>

        <ul className="w-[24%] flex justify-between items-center text-[1.2rem] text-center">
          <li
            onClick={() => {
              navigate("/search");
            }}
            className="flex justify-center items-center"
          >
            <FiSearch />
          </li>
          <li
            onClick={() => {
              navigate("/carts");
            }}
            className="flex justify-center items-center"
          >
            Carts
          </li>
          <li className="flex justify-center items-center">
            <BiSolidMessageSquareEdit />
          </li>
          {isLoggedIn() && (
            <li className="flex justify-center items-center">
              {isLoggedIn && userInfo && <User userInfo={userInfo} />}
            </li>
          )}

          {!isLoggedIn() && (
            <li
              onClick={() => {
                navigate("/login");
              }}
              className="flex justify-center items-center"
            >
              <button>Login</button>
            </li>
          )}

          {isLoggedIn() && (
            <li
              onClick={onLogoutClick}
              className="flex justify-center items-center"
            >
              <button>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
