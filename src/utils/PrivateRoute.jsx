import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Retrieve user token from local storage
  const userToken = localStorage.getItem("token");

  // If token exists, allow access; otherwise, redirect to login
  return userToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
