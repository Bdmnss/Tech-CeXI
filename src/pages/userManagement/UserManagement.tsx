import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { User } from '../../types/User';
import axiosInstance from '../../services/axiosInstance';
import Input from '../../components/Input';
import { currentPageAtom, searchTermAtom } from '../../atoms';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';

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

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User Management</h1>
      <Input
        name="search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onBlur={() => {}}
        placeholder="Search users..."
        className="mb-4 w-full rounded border p-2"
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4 overflow-x-auto scroll-smooth">
          <table className="mt-4 min-w-full border border-gray-300 bg-white">
            <thead>
              <tr>
                <th className="border-b border-gray-300 px-4 py-2">Name</th>
                <th className="border-b border-gray-300 px-4 py-2">Email</th>
                <th className="border-b border-gray-300 px-4 py-2">Age</th>
                <th className="border-b border-gray-300 px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 px-4 py-2">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.age}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
