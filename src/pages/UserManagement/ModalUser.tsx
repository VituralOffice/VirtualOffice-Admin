import { FC, useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Upload,
  message,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import UploadIcon from '@/assets/icons/ic-upload.svg?react';
import { DATE_FORMAT, HTTP_STATUS_CODE } from '@/constants/common';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CloseIcon from '@/assets/icons/ic-close.svg?react';
import CalendarIcon from '@/assets/icons/ic-black-calendar.svg?react';
import { IUser } from '@/interfaces/user';
import useUserStore from '@/stores/user.store';

type Props = {
  open: boolean;
  isEditing: boolean;
  userData?: IUser;
  onSuccess?: () => void;
  onCancel: () => void;
};

const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days after today
  return current && current > dayjs().endOf('day');
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const ModalUser: FC<Props> = ({
  open,
  isEditing,
  userData,
  onSuccess = () => {},
  onCancel,
}) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const { isProcessing, createUser, updateUser } = useUserStore(
    useShallow((state) => ({
      isProcessing: state.isProcessing,
      createUser: state.createUser,
      updateUser: state.updateUser,
    })),
  );
  const [submittable, setSubmittable] = useState(false);

  const handleCreate = async (params: Partial<IUser>) => {
    const res = await createUser(params);
    if (res.status === HTTP_STATUS_CODE.OK) {
      message.success('Tạo người dùng thành công!');
      onSuccess();
    }
  };

  const handleEdit = async (userId: number, params: Partial<IUser>) => {
    const res = await updateUser(userId, params);
    if (res.status === HTTP_STATUS_CODE.OK) {
      message.success('Cập nhật người dùng thành công!');
      onSuccess();
    }
  };

  const onFinish = (values: Partial<IUser> & { user_id: number }) => {
    const birthday = dayjs(values.birthday).toISOString();

    const { fullname, email, phone } = values;

    if (isEditing) {
      const params = {} as Partial<IUser>;

      if (userData?.fullname !== fullname) {
        params.fullname = fullname;
      }
      if (userData?.birthday !== birthday) {
        params.birthday = birthday;
      }
      if (!dayjs(userData?.birthday).isSame(dayjs(birthday))) {
        params.birthday = birthday;
      }
      if (userData?.phone! == phone) {
        params.phone = phone;
      }
      if (userData?.email !== email) {
        params.email = email;
      }

      handleEdit(userData?.user_id || 0, params);
    } else {
      const params = {
        ...values,
        birthday,
      } as Partial<IUser>;

      handleCreate(params);
    }
  };

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values, form]);

  useEffect(() => {
    if (open) {
      if (userData) {
        const { fullname, birthday, email, phone, avatar } = userData;
        form.setFieldsValue({
          fullname,
          birthday: dayjs(birthday),
          phone,
          email,
          avatar,
        });
      } else {
        form.setFieldsValue({
          fullname: '',
          birthday: '',
          phone: '',
          email: '',
          avatar: '',
        });
      }
    } else {
      form.resetFields();
    }
  }, [open, userData, form]);

  return (
    <Modal
      centered
      open={open}
      className='my-modal'
      title={isEditing ? 'Chỉnh sửa người dùng' : 'Tạo người dùng'}
      onCancel={onCancel}
      closeIcon={<CloseIcon />}
      footer={[
        <Button
          key='submit'
          loading={isProcessing}
          onClick={() => form.submit()}
          disabled={!submittable}
        >
          {isEditing ? 'Lưu' : 'Tạo'}
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout='vertical'
        name='customer-form'
        onFinish={onFinish}
      >
        <Row gutter={12}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form.Item
              name='avatar'
              label='Ảnh đại diện'
              rules={[{ required: true }]}
              style={{ marginBottom: 0 }}
              className='items-center'
            >
              <Upload
                listType='picture-circle'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                className='m-auto items-center'
              >
                {fileList.length ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: 'none' }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  type: 'email',
                  message: 'Email không hợp lệ',
                  required: true,
                },
              ]}
            >
              <Input placeholder='Enter here...' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name='fullname'
              label='Họ và tên'
              rules={[{ required: true }]}
            >
              <Input placeholder='Họ tên...' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name='phone'
              label='Số điện thoại'
              rules={[{ required: true }]}
            >
              <Input placeholder='Số đt...' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name='birthday'
              label='Sinh nhật'
              rules={[{ required: true }]}
            >
              <DatePicker
                placeholder='--/--/----'
                format={DATE_FORMAT}
                disabledDate={disabledDate}
                suffixIcon={<CalendarIcon className='w-5' />}
              />
            </Form.Item>
          </Col>
        </Row>
        {!isEditing ? (
          <Row gutter={12}>
            <Col span={24}>
              <Form.Item
                name='password'
                label='Mật khẩu'
                rules={[{ required: true }]}
              >
                <Input placeholder='Mật khẩu...' type='password' />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Form>
    </Modal>
  );
};

export default ModalUser;
