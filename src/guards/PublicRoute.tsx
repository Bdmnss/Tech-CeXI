import React from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import useFetchCurrentUser from '../hooks/useFetchCurrentUser';

interface PublicRouteProps {
  element: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
  const { currentUser, loading } = useFetchCurrentUser();

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (currentUser) {
    return <Navigate to="/users" replace />;
  }

  return element;
};

export default PublicRoute;
