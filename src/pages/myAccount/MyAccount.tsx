import React from 'react';
import { Card, Avatar, Typography, Spin } from 'antd';
import useFetchCurrentUser from '../../hooks/useFetchCurrentUser';
import { User } from '../../types/User';

const { Title, Text } = Typography;

const MyAccount: React.FC = () => {
  const {
    currentUser,
    loading,
  }: { currentUser: User | null; loading: boolean } = useFetchCurrentUser();

  return (
    <div style={{ padding: 24, minHeight: 380 }}>
      <h1 className="mb-4 text-2xl font-bold">My Account</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Card style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
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
  );
};

export default MyAccount;
