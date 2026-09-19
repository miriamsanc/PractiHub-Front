import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth();

  // Si no hay usuario conectado, lo mandamos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si la ruta requiere un rol específico y el usuario no lo tiene
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'student' ? '/dashboard' : '/dashboard-empresa'} replace />;
  }

  // Si todo está bien, mostramos el contenido protegido
  return <Outlet />;
}