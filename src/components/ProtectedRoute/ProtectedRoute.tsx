import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../../hooks/UseAuth/UseAuth';

type Props = {
  fallback?: string;
  children: any;
};

const ProtectedRoute: FC<Props> = ({ children, fallback }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={fallback || '/'} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
