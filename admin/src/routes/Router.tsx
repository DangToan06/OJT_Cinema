import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import { DashboardOverview } from "../pages/DashboardOverview";

import { MoviesManagement } from "../pages/MoviesManagement";
import { GenresManagement } from "../pages/GenresManagement";

import { ShowtimesManagement } from "../pages/ShowtimesManagement";

import { NewsManagement } from "../pages/NewsManagement";
import Layout from "../layout/Layout";
import { BookingsManagement } from "../pages/BookingsManagement";
import { ScreensManagement } from "../pages/ScreensManagement";
import { SeatsManagement } from "../pages/SeatsManagement";
import { PricingManagement } from "../pages/PricingManagement";
import { UsersManagement } from "../pages/UsersManagement";
import { PaymentsManagement } from "../pages/PaymentsManagement";
import { ReportsManagement } from "../pages/ReportsManagement";
import { TheatersManagement } from "../pages/TheatersManagement";
import AdminLogin from "../pages/AdminLogin";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: <AdminLogin />,
  },
  {
    path: "dashboard",
    element: (
      <Layout>
        <DashboardOverview></DashboardOverview>
      </Layout>
    ),
  },
  {
    path: "bookings",
    element: (
      <Layout>
        <BookingsManagement></BookingsManagement>
      </Layout>
    ),
  },
  {
    path: "bookings",
    element: (
      <Layout>
        <BookingsManagement></BookingsManagement>
      </Layout>
    ),
  },
  {
    path: "movies",
    element: (
      <Layout>
        <MoviesManagement></MoviesManagement>
      </Layout>
    ),
  },
  {
    path: "genres",
    element: (
      <Layout>
        <GenresManagement></GenresManagement>
      </Layout>
    ),
  },
  {
    path: "theaters",
    element: (
      <Layout>
        <TheatersManagement></TheatersManagement>
      </Layout>
    ),
  },
  {
    path: "screens",
    element: (
      <Layout>
        <ScreensManagement></ScreensManagement>
      </Layout>
    ),
  },
  {
    path: "seats",
    element: (
      <Layout>
        <SeatsManagement></SeatsManagement>
      </Layout>
    ),
  },
  {
    path: "theaters",
    element: (
      <Layout>
        <TheatersManagement></TheatersManagement>
      </Layout>
    ),
  },
  {
    path: "screens",
    element: (
      <Layout>
        <ScreensManagement></ScreensManagement>
      </Layout>
    ),
  },
  {
    path: "seats",
    element: (
      <Layout>
        <SeatsManagement></SeatsManagement>
      </Layout>
    ),
  },
  {
    path: "showtimes",
    element: (
      <Layout>
        <ShowtimesManagement></ShowtimesManagement>
      </Layout>
    ),
  },
  {
    path: "pricing",
    element: (
      <Layout>
        <PricingManagement></PricingManagement>
      </Layout>
    ),
  },
  {
    path: "pricing",
    element: (
      <Layout>
        <PricingManagement></PricingManagement>
      </Layout>
    ),
  },
  {
    path: "news",
    element: (
      <Layout>
        <NewsManagement></NewsManagement>
      </Layout>
    ),
  },
  {
    path: "users",
    element: (
      <Layout>
        <UsersManagement></UsersManagement>
      </Layout>
    ),
  },
  {
    path: "payments",
    element: (
      <Layout>
        <PaymentsManagement></PaymentsManagement>
      </Layout>
    ),
  },
  {
    path: "reports",
    element: (
      <Layout>
        <ReportsManagement></ReportsManagement>
      </Layout>
    ),
  },
  {
    path: "users",
    element: (
      <Layout>
        <UsersManagement></UsersManagement>
      </Layout>
    ),
  },
  {
    path: "payments",
    element: (
      <Layout>
        <PaymentsManagement></PaymentsManagement>
      </Layout>
    ),
  },
  {
    path: "reports",
    element: (
      <Layout>
        <ReportsManagement></ReportsManagement>
      </Layout>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
