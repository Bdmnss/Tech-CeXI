import React from 'react';
import {
  Spin,
  Empty,
  Popconfirm,
  Button,
  Table,
  Pagination,
  Input,
} from 'antd';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetchUsers from '../../hooks/useFetchUsers';
import useUserManagement from '../../hooks/useUserManagement';
import useAddUser from '../../hooks/useAddUser';
import useUpdateUser from '../../hooks/useUpdateUser';
import AddUserModal from '../../modals/AddUserModal';
import UpdateUserModal from '../../modals/UpdateUserModal';
import { User } from '../../types/User';
import useFetchCurrentUser from '../../hooks/useFetchCurrentUser';

const UserManagement: React.FC = () => {
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

  const {
    isAddModalVisible,
    showAddModal,
    handleAddOk,
    handleAddCancel,
    addForm,
  } = useAddUser(setAllUsers, allUsers);

  const {
    isUpdateModalVisible,
    showUpdateModal,
    handleUpdateOk,
    handleUpdateCancel,
    updateForm,
  } = useUpdateUser();

  // checks if accessToken is valid
  useFetchCurrentUser();

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
        <>
          <Button type="link" onClick={() => showUpdateModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const limit = 10;

  return (
    <div
      className="site-layout-content"
      style={{ padding: 24, minHeight: 380 }}
    >
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold">User Management</h1>
        <Button type="primary" onClick={showAddModal}>
          Add User
        </Button>
      </div>
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

      <ToastContainer />
      <AddUserModal
        isModalVisible={isAddModalVisible}
        handleOk={handleAddOk}
        handleCancel={handleAddCancel}
        form={addForm}
      />
      <UpdateUserModal
        isVisible={isUpdateModalVisible}
        onConfirm={handleUpdateOk}
        onCancel={handleUpdateCancel}
        form={updateForm}
      />
    </div>
  );
};

export default UserManagement;
