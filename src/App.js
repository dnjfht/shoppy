import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { onUserStateChange } from "./api/firebase";
import { isLoggedIn } from "./utils/utils";
import { loadCartServer } from "./api/cart";

import Main from "./pages/Main";
import Root from "./pages/Root";
import Detail from "./pages/Detail";
import MyCart from "./pages/MyCart";
import NotFoundPage from "./pages/NotFoundPage";
import NewProducts from "./pages/NewProducts";
import BestProducts from "./pages/BestProducts";
import ProductsList from "./pages/ProductsList";
import Search from "./pages/Search";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  const [user, setUser] = useState();
  const [allCarts, setAllCarts] = useState([]); // user가 있을 때 장바구니에 담긴 물건의 갯수
  const [nonMemberAllCarts, setNonMemberAllCarts] = useState([]); // user가 없을 때 장바구니에 담긴 물건의 갯수

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn()) {
      setNonMemberAllCarts([]);
    } else {
      const nonMemberCarts = JSON.parse(localStorage.getItem("carts"));
      setNonMemberAllCarts(nonMemberCarts);
    }
  }, []);

  useEffect(() => {
    if (user) {
      const getUserCart = async () => {
        const cart = await loadCartServer(user);
        setAllCarts(cart);
      };
      getUserCart();
    }
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root
          user={user}
          setUser={setUser}
          allCarts={allCarts}
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
          element: <MyPage />,
        },
        {
          path: "/products/detail/:productId",
          element: (
            <Detail
              user={user}
              setAllCarts={setAllCarts}
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
