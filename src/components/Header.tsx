import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '1',
      label: 'User Management',
      onClick: () => navigate('/users'),
    },
    {
      key: '2',
      label: 'My Account',
      onClick: () => navigate('/my-account'),
    },
  ];

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" items={menuItems} />
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
