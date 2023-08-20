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

  const [allCarts, setAllCarts] = useState([]);
  const [nonMemberAllCarts, setNonMemberAllCarts] = useState([]);
  console.log(user, allCarts);
  console.log(nonMemberAllCarts);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root
          user={user}
          setUser={setUser}
          allCarts={allCarts}
          nonMemberAllCarts={nonMemberAllCarts}
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
        { path: "/mypage", element: <MyPage /> },
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
