import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getFromStorage } from "../localstorage";

export const ProtectedRoute = () => {
  const isAuth =
    getFromStorage("isAuth") &&
    getFromStorage("token") &&
    getFromStorage("token") !== "";
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} replace state={location} />
  );
};
