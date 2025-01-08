import axiosInstance from './axiosInstance';

export const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.get('/users');
    const users = response.data.users;
    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );
    return user;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('An error occurred. Please try again later.');
  }
};
