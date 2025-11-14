import { Routes, Route } from "react-router";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/dashboard/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Users from "./views/dashboard/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { useUserStore } from "./stores/user";
import { useAuthStore } from "./stores/auth";
import { useEffect } from "react";
import Product from "./views/dashboard/Product";
import IndexService from "./views/dashboard/service/IndexService";
import CreateService from "./views/dashboard/service/CreateService";
import DetailService from "./views/dashboard/service/DetailService";

function App() {
  const { fetchUser } = useUserStore();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      void fetchUser();
    }
  }, [accessToken]);
  return (
    <>
      <Routes>
        {/* Dashboard Route */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/service" element={<IndexService />} />
          <Route path="/dashboard/service/:id" element={<DetailService />} />
          <Route path="/dashboard/create-service" element={<CreateService />} />
          <Route path="/dashboard/product" element={<Product />} />
        </Route>

        {/* Public Route */}
        <Route element={<GuestRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Redirect Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
