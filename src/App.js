import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Root from "./pages/Root";
import Detail from "./pages/Detail";
import MyCart from "./pages/MyCart";
import { useEffect, useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import NewProducts from "./pages/NewProducts";
import BestProducts from "./pages/BestProducts";
import ProductsList from "./pages/ProductsList";
import Search from "./pages/Search";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";
import { onUserStateChange } from "./api/firebase";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const [user, setUser] = useState();
  const [allCarts, setAllCarts] = useState([]);
  const [nonMemberAllCarts, setNonMemberAllCarts] = useState([]);

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  useEffect(() => {
    const carts = localStorage.getItem("carts");
    const nonMemberCarts = JSON.parse(carts);
    console.log(nonMemberCarts);
    setNonMemberAllCarts(nonMemberCarts);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root
          user={user}
          setUser={setUser}
          allCarts={allCarts}
          setAllCarts={setAllCarts}
          nonMemberAllCarts={nonMemberAllCarts}
          setNonMemberAllCarts={setNonMemberAllCarts}
        />
      ),
      children: [
        { index: true, element: <Main /> },
        { path: "/main", element: <Main /> },
        { path: "/products/new", element: <NewProducts /> },
        { path: "/products/best", element: <BestProducts /> },
        { path: "/products/:listName", element: <ProductsList /> },
        {
          path: "/login",
          element: <LoginPage />,
        },
        { path: "/signup", element: <SignUpPage /> },
        {
          path: "/mypage",
          element: <MyPage setAllCarts={setAllCarts} allCarts={allCarts} />,
        },
        {
          path: "/products/detail/:productId",
          element: (
            <Detail
              user={user}
              setAllCarts={setAllCarts}
              nonMemberAllCarts={nonMemberAllCarts}
              setNonMemberAllCarts={setNonMemberAllCarts}
            />
          ),
        },
        { path: "/search", element: <Search /> },
        {
          path: "/carts",
          element: (
            <MyCart
              user={user}
              allCarts={allCarts}
              setAllCarts={setAllCarts}
              nonMemberAllCarts={nonMemberAllCarts}
              setNonMemberAllCarts={setNonMemberAllCarts}
            />
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
