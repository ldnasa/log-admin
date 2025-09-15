import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<Login />} />
      
      {/* Redirect da raiz para dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Rotas Privadas */}
      <Route element={<PrivateRoute />}>
        {/* <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logs" element={<LogsList />} />
          <Route path="/logs/:id" element={<LogDetail />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route> */}
      </Route>
      
      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};