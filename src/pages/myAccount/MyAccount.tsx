import React from 'react';
import { Layout, Menu, Button, Card, Avatar, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import useFetchCurrentUser from '../../hooks/useFetchCurrentUser';
import { User } from '../../types/User';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const MyAccount: React.FC = () => {
  const {
    currentUser,
    loading,
  }: { currentUser: User | null; loading: boolean } = useFetchCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[
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
          ]}
        />
        <Button
          type="primary"
          danger
          onClick={handleLogout}
          style={{ float: 'right', marginTop: '16px' }}
        >
          Log Out
        </Button>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <h1 className="mb-4 text-2xl font-bold">My Account</h1>
          {loading ? (
            <Spin size="large" />
          ) : (
            <Card
              style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}
            >
              <Avatar
                size={100}
                src={currentUser?.image}
                style={{ marginBottom: 20 }}
              />
              <Title
                level={3}
              >{`${currentUser?.firstName} ${currentUser?.lastName}`}</Title>
              <Text type="secondary">{currentUser?.email}</Text>
              <div style={{ marginTop: 20 }}>
                <Text strong>Age: </Text>
                <Text>{currentUser?.age}</Text>
              </div>
              <div style={{ marginTop: 10 }}>
                <Text strong>Role: </Text>
                <Text>{currentUser?.role}</Text>
              </div>
            </Card>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My Account Page ©2023</Footer>
    </Layout>
  );
};

export default MyAccount;
