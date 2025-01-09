import { useState } from 'react';
import { User } from '../../../types/User';
import axiosInstance from '../../../services/axiosInstance';
import { toast } from 'react-toastify';
import { Form } from 'antd';

const useAddUser = (
  setAllUsers: React.Dispatch<React.SetStateAction<User[]>>,
  allUsers: User[]
) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [addForm] = Form.useForm();

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddOk = () => {
    addForm.validateFields().then(async (values) => {
      try {
        const response = await axiosInstance.post('/users/add', values);
        const addedUser = response.data;
        setAllUsers([...allUsers, addedUser]);
        toast.success('User added successfully');
        setIsAddModalVisible(false);
        addForm.resetFields();
      } catch (error) {
        console.error('Error adding user:', error);
        toast.error('Failed to add user');
      }
    });
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    addForm.resetFields();
  };

  return {
    isAddModalVisible,
    showAddModal,
    handleAddOk,
    handleAddCancel,
    addForm,
  };
};

export default useAddUser;
