import { useEffect, useState } from 'react';
import { User } from '../../../types/User';
import { fetchUsers } from '../../../services/userService';

const useFetchUsers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const users = await fetchUsers();
        setAllUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { allUsers, setAllUsers, loading };
};

export default useFetchUsers;
