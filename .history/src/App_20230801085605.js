import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Root from "./pages/Root";
import Detail from "./pages/Detail";
import MyCart from "./pages/MyCart";
import NotFoundPage from "./pages/NotFoundPage";
import NewProducts from "./pages/NewProducts";
import BestProducts from "./pages/BestProducts";
import ProductsList from "./pages/ProductsList";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Main /> },
        { path: "/products/new", element: <NewProducts /> },
        { path: "/products/best", element: <BestProducts /> },
        { path: "/products", element: <ProductsList /> },
        { path: "/products/detail/:productId", element: <Detail /> },
        { path: "/carts", element: <MyCart /> },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
