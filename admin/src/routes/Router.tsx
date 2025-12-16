import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import NotFoundPage from "../pages/NotFoundPage";
import AdminLogin from "../pages/AdminLogin";
import PrivateRoute from "./PrivateRoute.routes";
import PublicRoute from "./PublicRoute.routes";
import { DashboardOverview } from "../pages/DashboardOverview";
import { BookingsManagement } from "../pages/BookingsManagement";
import { MoviesManagement } from "../pages/MoviesManagement";
import { GenresManagement } from "../pages/GenresManagement";
import { ScreensManagement } from "../pages/ScreensManagement";
import { TheatersManagement } from "../pages/TheatersManagement";
import { SeatsManagement } from "../pages/SeatsManagement";
import { ShowtimesManagement } from "../pages/ShowtimesManagement";
import { PricingManagement } from "../pages/PricingManagement";
import { NewsManagement } from "../pages/NewsManagement";
import { UsersManagement } from "../pages/UsersManagement";
import { PaymentsManagement } from "../pages/PaymentsManagement";
import { ReportsManagement } from "../pages/ReportsManagement";

export const routers = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <AdminLogin />,
      },
    ],
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <DashboardOverview /> },
          { path: "bookings", element: <BookingsManagement /> },
          { path: "movies", element: <MoviesManagement /> },
          { path: "genres", element: <GenresManagement /> },
          { path: "theaters", element: <TheatersManagement /> },
          { path: "screens", element: <ScreensManagement /> },
          { path: "seats", element: <SeatsManagement /> },
          { path: "showtimes", element: <ShowtimesManagement /> },
          { path: "pricing", element: <PricingManagement /> },
          { path: "news", element: <NewsManagement /> },
          { path: "users", element: <UsersManagement /> },
          { path: "payments", element: <PaymentsManagement /> },
          { path: "reports", element: <ReportsManagement /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
