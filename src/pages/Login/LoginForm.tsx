import { FC, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import clsx from 'clsx';

import { TLoginParams } from '@/api/user.api';
import useAuthStore from '@/stores/auth.store';

import UserIcon from '@/assets/icons/ic-user.svg?react';
import './style.scss';
import Logo from '@/assets/logo.svg?react';

const initialValues: TLoginParams = {
  email: '',
};

const { Item } = Form;
const { Text } = Typography;

const LoginForm: FC = () => {
  const [form] = useForm();
  const [otpStep, setOtpStep] = useState(false);
  const [email, setEmail] = useState('');
  const { isProcessing, login, verify } = useAuthStore(
    useShallow((state) => ({
      isProcessing: state.isProcessing,
      login: state.login,
      verify: state.verify,
    })),
  );
  const onFinish = (values: TLoginParams) => {
    if (!otpStep) {
      setEmail(values.email);
      setOtpStep(true);
      login(values);
    } else {
      verify({ email, otp: values.otp });
    }
  };

  const handleFormChange = () => {};

  return (
    <Form
      form={form}
      initialValues={initialValues}
      className={clsx('login-form', 'flex-center flex-col')}
      onFieldsChange={handleFormChange}
      onFinish={onFinish}
    >
      <Logo width={120} height={120} />
      <Text className='text-center text-7 font-bold leading-8'>Đăng nhập</Text>
      <Text className='mb-8 mt-2 text-center'>
        Vui lòng đăng nhập để tiếp tục sử dụng
      </Text>

      {otpStep ? (
        <Item
          name='otp'
          rules={[{ required: true, message: 'Please input otp' }]}
        >
          <Input
            prefix={<UserIcon />}
            placeholder='Nhập mã otp'
            disabled={isProcessing}
          />
        </Item>
      ) : (
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
      )}
      <Item>
        <Button htmlType='submit' loading={isProcessing}>
          Tiếp tục
        </Button>
      </Item>
    </Form>
  );
};

export default LoginForm;
