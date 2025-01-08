import React from 'react';
import {
  Layout,
  Spin,
  Empty,
  Popconfirm,
  Button,
  Menu,
  Input,
  Table,
  Pagination,
} from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchCurrentUser from './hooks/useFetchCurrentUser';
import useFetchUsers from './hooks/useFetchUsers';
import useUserManagement from './hooks/useUserManagement';
import { User } from '../../types/User';

const { Header, Content, Footer } = Layout;

const UserManagement: React.FC = () => {
  useFetchCurrentUser();
  const { allUsers, setAllUsers, loading } = useFetchUsers();
  const {
    users,
    totalPages,
    currentPage,
    searchTerm,
    handleSearchChange,
    handlePageChange,
    handleDelete,
  } = useUserManagement(allUsers, setAllUsers);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_text: string, record: User) =>
        `${record.firstName} ${record.lastName}`,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_text: string, record: User) => (
        <Popconfirm
          title="Are you sure to delete this user?"
          onConfirm={() => handleDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  const limit = 10;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={[{ key: '1', label: 'User Management' }]}
        />
      </Header>
      <Content
        className="responsive-content"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className="site-layout-content"
          style={{ padding: 24, minHeight: 380 }}
        >
          <h1 className="mb-4 text-2xl font-bold">User Management</h1>
          <Input
            placeholder="Search users..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginBottom: 20, width: '100%' }}
          />
          {loading ? (
            <Spin size="large" />
          ) : users.length === 0 ? (
            <Empty description="No results" />
          ) : (
            <>
              <div className="table-container">
                <Table
                  columns={columns}
                  dataSource={users}
                  rowKey="id"
                  pagination={false}
                  scroll={{ x: 'max-content' }}
                />
              </div>
              <Pagination
                current={currentPage}
                total={totalPages * limit}
                pageSize={limit}
                onChange={handlePageChange}
                style={{ marginTop: 20, textAlign: 'center' }}
              />
            </>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        User Management Dashboard ©2023
      </Footer>
      <ToastContainer />
    </Layout>
  );
};

export default UserManagement;
