import { type ReactNode } from 'react'
import { useAuthStore } from '../stores/auth'
import { Navigate } from 'react-router'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute