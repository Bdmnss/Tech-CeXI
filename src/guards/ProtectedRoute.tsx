import React from 'react';
import { Navigate } from 'react-router-dom';
import useFetchCurrentUser from '../hooks/useFetchCurrentUser';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { currentUser, loading } = useFetchCurrentUser();

  if (!currentUser && !loading) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
