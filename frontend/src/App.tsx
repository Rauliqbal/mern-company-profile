import { Routes, Route } from "react-router";
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import Dashboard from './views/dashboard/Dashboard';
import DashboardLayout from "./layouts/DashboardLayout";
import Users from "./views/dashboard/Users";
import Service from "./views/dashboard/Service";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <>
      <Routes>
        {/* Dashboard Route */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/Service" element={<Service />} />
        </Route>

        {/* Public Route */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </>
  )
}

export default App
