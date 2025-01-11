import { useState, useEffect } from 'react';
import { getCurrentUser } from '../services/authService';
import Cookies from 'js-cookie';
import { User } from '../types/User';

const useFetchCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        try {
          const user = await getCurrentUser(accessToken);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { currentUser, loading };
};

export default useFetchCurrentUser;
