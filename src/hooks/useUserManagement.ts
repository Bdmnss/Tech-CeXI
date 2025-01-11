import { useEffect, useState } from 'react';
import { User } from '../types/User';
import { deleteUser } from '../services/userService';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../services/axiosInstance';

const useUserManagement = (
  allUsers: User[],
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = 10;

  // Effect to update the search term from URL parameters
  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
  }, [searchParams]);

  // Effect to filter and paginate users based on search term and current page
  useEffect(() => {
    const filteredUsers = allUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredUsers.length / limit));
    const startIndex = (currentPage - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
    setUsers(paginatedUsers);
  }, [allUsers, searchTerm, currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (userId: number) => {
    try {
      await deleteUser(userId);
      setAllUsers(allUsers.filter((user) => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const handleAddUser = async (newUser: Partial<User>) => {
    try {
      const response = await axiosInstance.post('/users/add', newUser);
      const addedUser = response.data;
      setAllUsers([addedUser, ...allUsers]);
      toast.success('User added successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      toast.error('Failed to add user');
    }
  };

  const handleUpdateUser = async (
    userId: number,
    updatedUser: Partial<User>
  ) => {
    try {
      const response = await axiosInstance.put(`/users/${userId}`, updatedUser);
      const updatedUserData = response.data;
      setAllUsers(
        allUsers.map((user) => (user.id === userId ? updatedUserData : user))
      );
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };

  return {
    users,
    totalPages,
    currentPage,
    searchTerm,
    handleSearchChange,
    handlePageChange,
    handleDelete,
    handleAddUser,
    handleUpdateUser,
  };
};

export default useUserManagement;
