import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IPrivateRouter {
  children: ReactNode;
}

export default function PrivateRouter({ children }: IPrivateRouter) {
  const isLogged = localStorage.getItem("token");

  return isLogged && atob(isLogged) === "admin@cinema.com:boMayLaAdmin" ? (
    children
  ) : (
    <Navigate to="/login" replace></Navigate>
  );
}
