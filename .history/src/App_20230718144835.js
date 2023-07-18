import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Root from "./pages/Root";
import AllProduct from "./pages/AllProduct";
import NewProduct from "./pages/NewProducts";
import Detail from "./pages/Detail";
import MyCart from "./pages/MyCart";
import NotFoundPage from "./pages/NotFoundPage";
import NewProducts from "./pages/NewProducts";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Main /> },
        { path: "/products", element: <AllProduct /> },
        { path: "/products/new", element: <NewProducts /> },
        { path: "/products/:productId", element: <Detail /> },
        { path: "/carts", element: <MyCart /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
