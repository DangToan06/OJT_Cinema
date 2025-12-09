import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/layout";
import News from "../pages/News";
import Payment from "../components/Payment";
import NotFoundPage from "../pages/NotFoundPage";
import MovieCalendar from "../pages/MovieCalendar";
import HomePage from "../pages/HomePage";

export const routers = createBrowserRouter([
  {
    path: "/news",
    element: (
      <Layout>
        <News></News>
      </Layout>
    ),
  },
  {
    path: "/payment",
    element: (
      <Layout>
        <Payment />
      </Layout>
    ),
  },
  {
    path: "/movie-calendar",
    element: (
      <Layout>
        <MovieCalendar />
      </Layout>
    ),
  },
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
