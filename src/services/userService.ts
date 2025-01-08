import axiosInstance from './axiosInstance';
import { User } from '../types/User';

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data.users;
};

// Delete a user by ID
export const deleteUser = async (userId: number): Promise<void> => {
  await axiosInstance.delete(`/users/${userId}`);
};
