import axiosInstance from './axiosInstance';

export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/user/login', {
      username: username,
      password,
      expiresInMins: 60,
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('An error occurred. Please try again later.');
  }
};

export const getCurrentUser = async (accessToken: string) => {
  try {
    const response = await axiosInstance.get('/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw new Error('An error occurred. Please try again later.');
  }
};
