import axiosInstance from './axiosInstance';

export const authenticateUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/user/login', {
      username: username,
      password,
      expiresInMins: 60,
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    const errorMessage =
      axiosError.response?.data?.message ||
      'An error occurred. Please try again later.';
    console.error('Error logging in:', errorMessage);
    throw new Error(errorMessage);
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
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    const errorMessage =
      axiosError.response?.data?.message ||
      'An error occurred. Please try again later.';
    console.error('Error fetching current user:', errorMessage);
    throw new Error(errorMessage);
  }
};
