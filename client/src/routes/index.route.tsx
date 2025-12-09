import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/layout";
import News from "../pages/News";
import Payment from "../pages/Payment";
import NotFoundPage from "../pages/NotFoundPage";
import MovieCalendar from "../pages/MovieCalendar";
import HomePage from "../pages/HomePage";
import TcketPrice from "../pages/TicketPrice";
import MovieDetail from "../pages/MovieDetail";
import FestivalPage from "../pages/FestivalPage";
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
  {
    path: "/ticketPrice",
    element: (
      <Layout>
        <TcketPrice></TcketPrice>
      </Layout>
    ),
  },
  {
    path: "/movieDetail",
    element: (
      <Layout>
        <MovieDetail></MovieDetail>,
      </Layout>
    ),
  },
  {
    path: "/festival",
    element: (
      <Layout>
        <FestivalPage></FestivalPage>
      </Layout>
    ),
  },
]);
