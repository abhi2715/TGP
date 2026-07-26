import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requireShikhar?: boolean;
}

const ProtectedRoute = ({ requireShikhar = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isShikharUnlocked } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireShikhar && !isShikharUnlocked) {
    // If they are logged in but don't have Shikhar access, we could redirect to a "Buy Shikhar" page.
    // For now, just redirect to home.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
