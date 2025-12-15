import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import { DashboardOverview } from "../pages/DashboardOverview";
import { BookingsManagement } from "../pages/BookingsManagement";
import { MoviesManagement } from "../pages/MoviesManagement";
import { GenresManagement } from "../pages/GenresManagement";
import { TheatersManagement } from "../pages/TheatersManagement";
import { ScreensManagement } from "../pages/ScreensManagement";
import { SeatsManagement } from "../pages/SeatsManagement";
import { PricingManagement } from "../pages/PricingManagement";
import { NewsManagement } from "../pages/NewsManagement";
import { UsersManagement } from "../pages/UsersManagement";
import { PaymentsManagement } from "../pages/PaymentsManagement";
import { ReportsManagement } from "../pages/ReportsManagement";
import Layout from "../layout/Layout";
import { ShowtimesManagement } from "../pages/ShowtimesManagement";
import AdminLogin from "../pages/AdminLogin";
import PrivateRouter from "./PrivateRouter";

export const routers = createBrowserRouter([
  {
    path: "login",
    element: <AdminLogin></AdminLogin>,
  },
  {
    path: "",
    element: (
      <PrivateRouter>
        <Layout>
          <DashboardOverview></DashboardOverview>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "bookings",
    element: (
      <PrivateRouter>
        <Layout>
          <BookingsManagement></BookingsManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "movies",
    element: (
      <PrivateRouter>
        <Layout>
          <MoviesManagement></MoviesManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "genres",
    element: (
      <PrivateRouter>
        <Layout>
          <GenresManagement></GenresManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "theaters",
    element: (
      <PrivateRouter>
        <Layout>
          <TheatersManagement></TheatersManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "screens",
    element: (
      <PrivateRouter>
        <Layout>
          <ScreensManagement></ScreensManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "seats",
    element: (
      <PrivateRouter>
        <Layout>
          <SeatsManagement></SeatsManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "showtimes",
    element: (
      <PrivateRouter>
        <Layout>
          <ShowtimesManagement></ShowtimesManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "pricing",
    element: (
      <PrivateRouter>
        <Layout>
          <PricingManagement></PricingManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "news",
    element: (
      <PrivateRouter>
        <Layout>
          <NewsManagement></NewsManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "users",
    element: (
      <PrivateRouter>
        <Layout>
          <UsersManagement></UsersManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "payments",
    element: (
      <PrivateRouter>
        {" "}
        <Layout>
          <PaymentsManagement></PaymentsManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "reports",
    element: (
      <PrivateRouter>
        <Layout>
          <ReportsManagement></ReportsManagement>
        </Layout>
      </PrivateRouter>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
