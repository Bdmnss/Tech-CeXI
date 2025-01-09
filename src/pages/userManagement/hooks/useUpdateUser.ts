import { useState } from 'react';
import { User } from '../../../types/User';
import axiosInstance from '../../../services/axiosInstance';
import { toast } from 'react-toastify';
import { Form } from 'antd';

const useUpdateUser = (
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>,
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

  const handleUpdateOk = () => {
    if (currentUserId !== null) {
      updateForm.validateFields().then(async (values) => {
        try {
          const response = await axiosInstance.put(
            `/users/${currentUserId}`,
            values
          );
          const updatedUser = response.data;
          setAllUsers(
            allUsers.map((user) =>
              user.id === currentUserId ? updatedUser : user
            )
          );
          toast.success('User updated successfully');
          setIsUpdateModalVisible(false);
          updateForm.resetFields();
        } catch (error) {
          console.error('Error updating user:', error);
          toast.error('Failed to update user');
        }
      });
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
