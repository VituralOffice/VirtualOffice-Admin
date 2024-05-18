import { FC, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import clsx from 'clsx';

import { TLoginParams } from '@/api/user.api';
import useAuthStore from '@/stores/auth.store';

import UserIcon from '@/assets/icons/ic-user.svg?react';
import LockIcon from '@/assets/icons/ic-lock.svg?react';
import './style.scss';
import Logo from '@/assets/icons/ic-logo-login.svg?react';

const initialValues: TLoginParams = {
  email: '',
  password: '',
};

const { Item } = Form;
const { Text } = Typography;

const LoginForm: FC = () => {
  const [form] = useForm();
  const { isProcessing, login } = useAuthStore(
    useShallow((state) => ({
      isProcessing: state.isProcessing,
      login: state.login,
    })),
  );
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  const onFinish = (values: TLoginParams) => {
    login(values);
  };

  const handleFormChange = () => {
    const { email, password }: TLoginParams = form.getFieldsValue();
    setDisabledSubmit(!email || !password);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      className={clsx('login-form', 'flex-center flex-col')}
      onFieldsChange={handleFormChange}
      onFinish={onFinish}
    >
      <Logo />
      <Text className='text-center text-7 font-bold leading-8'>Đăng nhập</Text>
      <Text className='mb-8 mt-2 text-center'>
        Vui lòng đăng nhập để tiếp tục sử dụng
      </Text>
      <Item
        name='email'
        rules={[{ required: true, message: 'Please input username' }]}
      >
        <Input
          prefix={<UserIcon />}
          placeholder='Tên đăng nhập'
          disabled={isProcessing}
        />
      </Item>
      <Item
        name='password'
        rules={[{ required: true, message: 'Please input password' }]}
      >
        <Input
          prefix={<LockIcon />}
          type='password'
          placeholder='Mật khẩu'
          disabled={isProcessing}
        />
      </Item>
      <Item>
        <Button
          htmlType='submit'
          loading={isProcessing}
          disabled={disabledSubmit}
        >
          Đăng nhập
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
