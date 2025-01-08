import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { User } from '../../../types/User';
import { deleteUser } from '../../../services/userService';
import { currentPageAtom, searchTermAtom } from '../../../atoms';
import { useDebounce } from 'use-debounce';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useUserManagement = (
  allUsers: User[],
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const navigate = useNavigate();

  const limit = 10;

  // Effect to update the search term from URL parameters
  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchTerm(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Effect to filter and paginate users based on search term and current page
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

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return {
    users,
    totalPages,
    currentPage,
    searchTerm,
    handleSearchChange,
    handlePageChange,
    handleDelete,
    handleLogout,
  };
};

export default useUserManagement;
