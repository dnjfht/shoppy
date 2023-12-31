import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  authService,
  loadCartServer,
  onUserStateChange,
} from "../api/firebase";
import { isLoggedIn } from "../utils/utils";
import User from "./User";

import { FiSearch } from "react-icons/fi";
import { IoIosCart } from "react-icons/io";

export default function Navbar({
  user,
  setUser,
  allCarts,
  setAllCarts,
  nonMemberAllCarts,
  setNonMemberAllCarts,
}) {
  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  const getUserCart = async () => {
    let cart;
    if (user) {
      cart = await loadCartServer(user);
      setAllCarts(cart);
    }
  };

  useEffect(() => {
    getUserCart();
  }, [user]);

  useEffect(() => {
    const carts = localStorage.getItem("carts");
    const nonMemberCarts = JSON.parse(carts);
    console.log(nonMemberCarts);
    setNonMemberAllCarts(nonMemberCarts);
  }, []);

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
      } w-full h-[130px] fixed left-0 top-0 z-[99999999999999] transition-all duration-700 hover:bg-[rgba(255,255,255,100)] hover:shadow-lg cursor-pointer`}
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

        <ul
          className={`${
            user ? "w-[24%]" : "w-[12%]"
          } flex justify-between items-center text-[1.2rem] text-center`}
        >
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
            className="flex justify-center items-center text-[1.6rem] relative"
          >
            <IoIosCart />
            <p className="w-5 h-5 bg-[#ff4273] text-white rounded-full text-[0.9rem] flex justify-center items-center absolute top-[-5px] right-[-8px]">
              {user !== null && allCarts.length}
              {user === null && nonMemberAllCarts.length}
            </p>
          </li>
          {isLoggedIn() && (
            <li className="flex justify-center items-center">
              {isLoggedIn && user && <User user={user} />}
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
