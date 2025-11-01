import { type ReactNode } from 'react'
import { useAuthStore } from '../stores/auth'
import { Navigate } from 'react-router'

function ProtectedRoute({children}: {children:ReactNode}) {
  const token = useAuthStore()

  if(!token) {
    return <Navigate to="/login" replace/>;
  }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute