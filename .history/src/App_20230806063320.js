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

function App() {
  // 세션 스토리지에서 로그인한 유저 정보 가져오기
  const userInfo = JSON.parse(
    sessionStorage.getItem(
      "firebase:authUser:AIzaSyBuSJcIvQdMItFfKi8IchzBpWfqY9YUDFE:[DEFAULT]"
    )
  );

  console.log(userInfo);

  // uid 값에 접근하기
  // const uid = userInfo.uid;

  // uid를 출력하거나 다른 작업에 활용할 수 있습니다.
  // console.log(uid);

  const [user, setUser] = useState();
  const [allCarts, setAllCarts] = useState([]);
  console.log(allCarts);

  useEffect(() => {
    setUser(userInfo);
  }, [user]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} setUser={setUser} />,
      children: [
        { index: true, element: <Main /> },
        { path: "/products/new", element: <NewProducts /> },
        { path: "/products/best", element: <BestProducts /> },
        { path: "/products/:listName", element: <ProductsList /> },
        {
          path: "/login",
          element: <LoginPage />,
        },
        { path: "signup", element: <SignUpPage /> },
        {
          path: "/products/detail/:productId",
          element: <Detail user={user} setAllCarts={setAllCarts} />,
        },
        { path: "/search", element: <Search /> },
        {
          path: "/carts",
          element: (
            <MyCart user={user} allCarts={allCarts} setAllCarts={setAllCarts} />
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
