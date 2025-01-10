import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return <Navigate to="/users" replace />;
  }

  return element;
};

export default PublicRoute;
