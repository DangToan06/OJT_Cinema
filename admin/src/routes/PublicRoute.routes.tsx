import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const token = localStorage.getItem("token");

  if (token && atob(token) === "admin@cinema.com:boMayLaAdmin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
