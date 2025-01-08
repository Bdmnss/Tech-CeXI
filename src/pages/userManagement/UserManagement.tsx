import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { User } from '../../types/User';
import axiosInstance from '../../services/axiosInstance';
import { currentPageAtom, searchTermAtom } from '../../atoms';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { Layout, Menu, Input, Table, Pagination, Spin, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

const UserManagement: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const limit = 10;

  // Fetch users from the API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users');
      setAllUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Update search term from URL parameters
  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Filter and paginate users based on search term and current page
  useEffect(() => {
    const filteredUsers = allUsers.filter(
      (user) =>
        user.firstName
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredUsers.length / limit));
    const startIndex = (currentPage - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
    setUsers(paginatedUsers);
  }, [allUsers, debouncedSearchTerm, currentPage]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
  ];

  const menuItems = [
    {
      key: '1',
      label: 'User Management',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={menuItems}
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
    </Layout>
  );
};

export default UserManagement;
