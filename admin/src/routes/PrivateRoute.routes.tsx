import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = atob(token);

    if (decoded !== "admin@cinema.com:boMayLaAdmin") {
      localStorage.removeItem("token");
      // eslint-disable-next-line react-hooks/error-boundaries
      return <Navigate to="/login" replace />;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
