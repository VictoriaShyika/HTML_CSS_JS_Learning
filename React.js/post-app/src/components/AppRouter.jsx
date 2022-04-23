import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }
  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        );
      })}
      <Route path="*" element={<Navigate replace to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => {
        return (
          <Route
            path={route.path}
            element={<route.component />}
            key={route.path}
          />
        );
      })}
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};
export default AppRouter;
