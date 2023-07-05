import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";
import Root from "./pages/Root";
import Detail from "./pages/Detail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Main /> },
        { path: "/detail/:productId", element: <Detail /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
