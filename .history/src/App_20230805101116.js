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
import { useState } from "react";

function App() {
  const [user, setUser] = useState();
  const [allCarts, setAllCarts] = useState([]);

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
          path: "/products/detail/:productId",
          element: (
            <Detail user={user} allCarts={allCarts} setAllCarts={setAllCarts} />
          ),
        },
        { path: "/search", element: <Search /> },
        {
          path: "/carts",
          element: <MyCart allCarts={allCarts} setAllCarts={setAllCarts} />,
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
