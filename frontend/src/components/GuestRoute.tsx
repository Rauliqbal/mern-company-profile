import { useAuthStore } from '../stores/auth'
import { Navigate, Outlet } from 'react-router'

function GuestRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}

export default GuestRoute