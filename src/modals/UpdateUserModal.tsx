import React from 'react';
import { Modal, Form, Input, Select, FormInstance } from 'antd';

const { Option } = Select;

interface UpdateUserModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  form: FormInstance;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isVisible,
  onConfirm,
  onCancel,
  form,
}) => {
  return (
    <Modal
      title="Update User"
      open={isVisible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please input the first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please input the last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please input the age!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input the email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select the role!' }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="moderator">Moderator</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserModal;
