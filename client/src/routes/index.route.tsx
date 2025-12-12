import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/layout";
import News from "../pages/News";
import Payment from "../pages/Payment";
import NotFoundPage from "../pages/NotFoundPage";
import MovieCalendar from "../pages/MovieCalendar";
import HomePage from "../pages/HomePage";
import TcketPrice from "../pages/TicketPrice";
import FestivalPage from "../pages/FestivalPage";
import Booking from "../pages/Booking"
import Promotions from "../pages/Promotions";
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
    path: "/festival",
    element: (
      <Layout>
        <FestivalPage></FestivalPage>
      </Layout>
    ),
  },
  {
    path: "/booking",
    element: (
      <Layout>
        <Booking></Booking>
      </Layout>
    ),
  },
  {
    path: "/promotions",
    element: (
      <Layout>
        <Promotions/>
      </Layout>
    )
  }
]);
