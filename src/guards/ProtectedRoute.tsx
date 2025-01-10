import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
