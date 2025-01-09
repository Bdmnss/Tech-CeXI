import { useState } from 'react';
import { User } from '../../../types/User';
import axiosInstance from '../../../services/axiosInstance';
import { toast } from 'react-toastify';
import { Form } from 'antd';

const useAddUser = (
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>,
  allUsers: User[]
) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        const response = await axiosInstance.post('/users/add', values);
        const addedUser = response.data;
        setAllUsers([...allUsers, addedUser]);
        toast.success('User added successfully');
        setIsModalVisible(false);
        form.resetFields();
      } catch (error) {
        console.error('Error adding user:', error);
        toast.error('Failed to add user');
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return {
    isModalVisible,
    showModal,
    handleOk,
    handleCancel,
    form,
  };
};

export default useAddUser;
