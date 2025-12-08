import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Layout1 from "../pages/Layout1";
import Layout2 from "../pages/Layout2";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
  },
  {
    path: "/layout1",
    element: <Layout1></Layout1>,
  },
  {
    path: "/layout2",
    element: <Layout2></Layout2>,
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
