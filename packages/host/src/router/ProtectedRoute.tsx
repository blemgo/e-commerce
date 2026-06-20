import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '@contexts/user';
import type { Role } from '@shared/types';

interface ProtectedRouteProps {
  roles?: Role | Role[];
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children }: ProtectedRouteProps) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles !== undefined) {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export { ProtectedRoute };
