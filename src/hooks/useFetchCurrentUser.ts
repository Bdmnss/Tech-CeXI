import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import { toast } from 'react-toastify';
import { User } from '../types/User';

const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        try {
          const user = await getCurrentUser(accessToken);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error fetching current user:', error);
          toast.error('Failed to fetch current user. Please log in again.');
          localStorage.removeItem('accessToken');
          navigate('/login'); // Redirect to login page if fetching current user fails
        } finally {
          setLoading(false);
        }
      } else {
        toast.error('No access token found. Please log in.');
        localStorage.removeItem('accessToken');
        navigate('/login'); // Redirect to login page if no access token is found
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  return { currentUser, loading };
};

export default useFetchCurrentUser;
