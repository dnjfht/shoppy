import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  const router = createBrowserRouter([{ path: "/", element: <Main /> }]);

  return <RouterProvider router={router} />;
}

export default App;
