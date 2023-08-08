import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Root from "./pages/Root";
import Detail from "./pages/Detail";
import MyCart from "./pages/MyCart";
import NotFoundPage from "./pages/NotFoundPage";
import NewProducts from "./pages/NewProducts";
import BestProducts from "./pages/BestProducts";
import ProductsList from "./pages/ProductsList";
import Search from "./pages/Search";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  const [user, setUser] = useState();
  console.log(user);

  const [currentPage, setCurrentPage] = useState("main"); // 현재 렌더링할 페이지 상태
  const [allCarts, setAllCarts] = useState([]);
  const [nonMemberAllCarts, setNonMemberAllCarts] = useState([]);
  console.log(user, allCarts);
  console.log(nonMemberAllCarts);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root user={user} setUser={setUser} setCurrentPage={setCurrentPage} />
      ),
      children: [
        { index: true, element: <Main /> },
        { path: "/main", element: <Main setCurrentPage={setCurrentPage} /> },
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
          element: <MyPage setCurrentPage={setCurrentPage} />,
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

  useEffect(() => {
    if (currentPage === "main") {
      navigate("/main"); // 현재 페이지 상태가 "main"일 때 Main 페이지로 이동
    } else if (currentPage === "mypage") {
      navigate("/mypage"); // 현재 페이지 상태가 "mypage"일 때 MyPage 페이지로 이동
    }
  }, [currentPage]);
  return <RouterProvider router={router} />;
}

export default App;
