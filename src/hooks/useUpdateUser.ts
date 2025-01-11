import { useState } from 'react';
import { User } from '../types/User';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';
import { Form } from 'antd';

const useUpdateUser = (
  setAllUsers: (users: User[]) => void,
  allUsers: User[]
) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [updateForm] = Form.useForm();
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const showUpdateModal = (user: User) => {
    setCurrentUserId(user.id);
    updateForm.setFieldsValue(user);
    setIsUpdateModalVisible(true);
  };

  const handleUpdateOk = async () => {
    if (currentUserId !== null) {
      try {
        const values = await updateForm.validateFields();
        const response = await axiosInstance.put(
          `/users/${currentUserId}`,
          values
        );
        const updatedUser = response.data;
        toast.success('User updated successfully');
        setIsUpdateModalVisible(false);
        updateForm.resetFields();

        const updatedUsers = allUsers.map((user) =>
          user.id === currentUserId ? updatedUser : user
        );
        setAllUsers(updatedUsers);
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user');
      }
    }
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    updateForm.resetFields();
  };

  return {
    isUpdateModalVisible,
    showUpdateModal,
    handleUpdateOk,
    handleUpdateCancel,
    updateForm,
  };
};

export default useUpdateUser;
