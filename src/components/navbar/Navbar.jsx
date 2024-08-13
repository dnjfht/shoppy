import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/utils";
import { authService } from "../../api/firebase";

import User from "../navbar/User";
import Button from "../button/Button";
import Util from "./Util";

import { FiSearch } from "react-icons/fi";
import { IoIosCart } from "react-icons/io";

export default function Navbar({ user, allCarts, nonMemberAllCarts }) {
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

  const allCartsNum =
    isLoggedIn() && allCarts.length
      ? allCarts.length
      : !isLoggedIn() && nonMemberAllCarts.length
      ? nonMemberAllCarts.length
      : 0;

  return (
    <div
      className={`${
        scrollHeight >= 140
          ? "bg-[rgba(255,255,255,100)] shadow-lg"
          : "bg-[rgba(255,255,255,0)]"
      } w-full lg:h-[130px] 3sm:h-auto lg:py-0 sm:py-4 py-4 fixed left-0 top-0 z-[99999999] transition-all duration-700 hover:bg-[rgba(255,255,255,100)] hover:shadow-lg cursor-pointer`}
    >
      <div className="flex items-center justify-between w-full sm:max-w-[90%] 3sm:max-w-[96%] h-full mx-auto flex-wrap">
        <Button
          onClick={() => navigate("/")}
          styles="flex items-center text-[2.5rem] font-[InkLipquid] order-1"
        >
          <img
            className="lg:w-[5rem] md:w-[4rem] sm:w-[3rem] 3sm:w-[2.4rem] object-cover"
            src={process.env.PUBLIC_URL + "/image/logo.png"}
            alt="logo"
          />
          <p className="lg:text-[2.5rem] md:text-[1.8rem] sm:text-[1.6rem] text-[1.6rem] ml-3 sm:block 3sm:hidden">
            Birthday Party
          </p>
        </Button>

        <ul className="lg:w-2/5 3sm:w-full lg:mt-0 sm:mt-4 mt-4 flex items-center justify-between lg:text-[1.2rem] sm:text-[1.1rem] 3sm:text-[0.8rem] lg:order-2 sm:order-3 order-3">
          <Util
            text="New"
            onClick={() => {
              navigate("/products/new");
            }}
          />
          <Util
            text="Best"
            onClick={() => {
              navigate("/products/best");
            }}
          />

          {category.map((c, index) => (
            <Util
              key={index}
              text={c}
              onClick={() => {
                navigate(`/products/${c}`);
              }}
            />
          ))}
        </ul>

        <ul className="flex justify-between items-center xl:text-[1.2rem] lg:text-[1.1rem] sm:text-[1rem] 3sm:text-[0.8rem] text-center xl:gap-x-6 sm:gap-x-4 gap-x-4 lg:order-3 sm:order-2 order-2">
          <Util
            icon={<FiSearch />}
            styles="flex items-center justify-center"
            onClick={() => {
              navigate("/search");
            }}
          />
          <Util
            icon={<IoIosCart />}
            styles="flex justify-center items-center xl:text-[1.6rem] lg:text-[1.4rem] sm:text-[1.2rem] 3sm:text-[1.1rem] relative"
            onClick={() => {
              navigate("/carts");
            }}
          >
            <p className="sm:w-5 sm:h-5 3sm:w-4 3sm:h-4 bg-[#ff4273] text-white rounded-full text-[0.9rem] flex justify-center items-center absolute top-[-5px] right-[-8px]">
              {allCartsNum}
            </p>
          </Util>
          <Util
            styles={`${isLoggedIn() ? "block" : "hidden"}
           flex items-center justify-center`}
            onClick={() => {
              navigate("/carts");
            }}
          >
            <User user={user} />
          </Util>
          <Util
            text={user ? "Logout" : "Login"}
            styles="flex items-center justify-center"
            onClick={() => {
              if (isLoggedIn()) {
                if (window.confirm("로그아웃 하시겠습니까?")) {
                  return authService.signOut().then(() => {
                    sessionStorage.clear();

                    alert("로그아웃 되었습니다.");
                    window.location.href = "/";
                  });
                } else {
                  return;
                }
              } else {
                navigate("/login");
              }
            }}
          />
        </ul>
      </div>
    </div>
  );
}
