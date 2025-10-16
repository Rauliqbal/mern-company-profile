import { Routes, Route } from "react-router";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Dashboard from "../views/dashboard/Index";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
