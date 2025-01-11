import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/users',
      label: 'User Management',
      onClick: () => navigate('/users'),
    },
    {
      key: '/my-account',
      label: 'My Account',
      onClick: () => navigate('/my-account'),
    },
  ];

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        items={menuItems}
        selectedKeys={[location.pathname]}
      />
      <Button
        type="primary"
        danger
        onClick={() => {
          localStorage.removeItem('accessToken');
          navigate('/login');
        }}
        style={{ float: 'right', marginTop: '16px' }}
      >
        Log Out
      </Button>
    </Header>
  );
};

export default AppHeader;
