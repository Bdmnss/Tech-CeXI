import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../services/authService';
import { toast } from 'react-toastify';

const useFetchCurrentUser = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        try {
          const currentUser = await getCurrentUser(accessToken);
          console.log('Current User:', currentUser);
        } catch (error) {
          console.error('Error fetching current user:', error);
          toast.error('Failed to fetch current user. Please log in again.');
          navigate('/login'); // Redirect to login page if fetching current user fails
        }
      } else {
        toast.error('No access token found. Please log in.');
        navigate('/login'); // Redirect to login page if no access token is found
      }
    };

    fetchCurrentUser();
  }, [navigate]);
};

export default useFetchCurrentUser;
