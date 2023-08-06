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
  const [user, setUser] = useState(() => {
    // 초기 값은 세션 스토리지에서 가져온 값으로 설정
    const userInfo = JSON.parse(
      sessionStorage.getItem(
        "firebase:authUser:AIzaSyBuSJcIvQdMItFfKi8IchzBpWfqY9YUDFE:[DEFAULT]"
      )
    );
    return userInfo;
  });

  useEffect(() => {
    // 세션 스토리지 변경 이벤트 핸들러 등록
    const handleStorageChange = (event) => {
      if (
        event.key ===
        "firebase:authUser:AIzaSyBuSJcIvQdMItFfKi8IchzBpWfqY9YUDFE:[DEFAULT]"
      ) {
        const userInfo = JSON.parse(event.newValue);
        setUser(userInfo); // 변경된 사용자 정보로 state 업데이트
      }
    };

    // 브라우저 이벤트 등록
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 제거
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  console.log(user);

  // uid 값에 접근하기
  // const uid = userInfo.uid;

  // uid를 출력하거나 다른 작업에 활용할 수 있습니다.
  // console.log(uid);

  const [allCarts, setAllCarts] = useState([]);
  console.log(userInfo, allCarts);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root user={user} />,
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
        { path: "mypage", element: <MyPage /> },
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
