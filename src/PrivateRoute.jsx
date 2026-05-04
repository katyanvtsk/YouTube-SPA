import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { selectAuth } from "./redux/slices/authSlice";

const PrivateRoute = () => {
  const { token } = useSelector(selectAuth);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
