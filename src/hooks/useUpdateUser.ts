import { useState } from 'react';
import { User } from '../types/User';
import axiosInstance from '../services/axiosInstance';
import { toast } from 'react-toastify';
import { Form } from 'antd';

const useUpdateUser = () => {
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
        await axiosInstance.put(`/users/${currentUserId}`, values);
        toast.success('User updated successfully');
        setIsUpdateModalVisible(false);
        updateForm.resetFields();
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
