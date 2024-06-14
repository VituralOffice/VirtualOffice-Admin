import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Button, Col, Form, Input, Modal, Row, Upload, message } from 'antd';
import { HTTP_STATUS_CODE } from '@/constants/common';
import type { UploadFile, UploadProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IMap } from '@/interfaces/map';
import useMapStore from '@/stores/map.store';
import CloseIcon from '@/assets/icons/ic-close.svg?react';
import { request } from '@/api/request';

type Props = {
  open: boolean;
  isEditing: boolean;
  mapData?: IMap;
  onSuccess?: () => void;
  onCancel: () => void;
};

//type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });
const ModalMap = ({ open, isEditing, mapData, onSuccess = () => {}, onCancel }: Props) => {
  const [form] = Form.useForm();
  const values = Form.useWatch([], form);
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [fileUpload, setFileUpload] = useState('');
  const handleUploadFile = async (file: File) => {
    try {
      const form = new FormData();
      form.append('file', file);
      const { data } = await request(`post`, '/v1/upload', form);
      if (data.result) {
        setFileUpload(data.result.path);
      }
    } catch (error) {}
  };
  const handleChange: UploadProps['onChange'] = async ({ fileList: newFileList }) => {
    console.log({ newFileList });
    if (newFileList.length > 0) {
      newFileList = newFileList.reverse();
      await handleUploadFile(newFileList[0].originFileObj as File);
      setFileList([newFileList[0]]);
    } else setFileList([]);
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const { isProcessing, createMap, updateMap } = useMapStore(
    useShallow((state) => ({
      isProcessing: state.isProcessing,
      createMap: state.createMap,
      updateMap: state.updateMap,
    })),
  );
  const [submittable, setSubmittable] = useState(false);

  const handleCreate = async (params: Partial<IMap>) => {
    const res = await createMap(params);
    if (res.status === HTTP_STATUS_CODE.OK) {
      message.success('Create map success!');
      onSuccess();
    }
  };

  const handleEdit = async (mapId: string, params: Partial<IMap>) => {
    const res = await updateMap(mapId, params);
    if (res.status === HTTP_STATUS_CODE.OK) {
      message.success('Update Map success!');
      onSuccess();
    }
  };

  const onFinish = (values: Exclude<IMap, '_id'>) => {
    console.log({ values, mapData });
    const { name, totalChair, totalMeeting, capacity, totalWhiteboard, style } = values;
    if (isEditing) {
      const params = {} as Partial<IMap>;
      if (mapData?.name !== name) {
        params.name = name;
      }
      if (mapData?.totalChair !== totalChair) {
        params.totalChair = totalChair;
      }
      if (mapData?.totalMeeting !== totalMeeting) {
        params.totalMeeting = totalMeeting;
      }
      if (mapData?.capacity !== capacity) {
        params.capacity = capacity;
      }
      if (mapData?.totalWhiteboard !== totalWhiteboard) {
        params.totalWhiteboard = totalWhiteboard;
      }
      if (mapData?.style !== style) {
        params.style = style;
      }
      if (fileUpload) {
        params.json = fileUpload;
      }
      handleEdit(mapData?._id || '', {
        ...params,
      });
    } else {
      const params = {
        ...values,
        json: fileUpload,
      } as Partial<IMap>;
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
      if (mapData) {
        const { _id, capacity, name, totalChair, totalMeeting, json, totalWhiteboard, style, icon } = mapData;
        if (json)
          setFileList([
            {
              name: mapData.json.substring(mapData.json.length - 20),
              uid: '1',
            },
          ]);
        form.setFieldsValue({
          _id,
          capacity,
          name,
          totalChair,
          totalMeeting,
          json,
          totalWhiteboard,
          style,
          icon,
        });
      } else {
        form.setFieldsValue({
          capacity: '',
          name: '',
          totalChair: '',
          totalMeeting: '',
          totalWhiteboard: '',
          json: '',
          icon: '',
        });
      }
    } else {
      form.resetFields();
    }
  }, [open, mapData, form]);
  return (
    <Modal
      centered
      open={open}
      className="my-modal"
      title={isEditing ? 'Edit map' : 'Create map'}
      onCancel={onCancel}
      closeIcon={<CloseIcon />}
      footer={[
        <Button key="submit" loading={isProcessing} onClick={() => form.submit()} disabled={!submittable}>
          {isEditing ? 'Save' : 'Create'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="customer-form" onFinish={onFinish}>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter here..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="capacity" label="Capacity" rules={[{ required: true }]}>
              <Input placeholder="Capacity..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="totalMeeting" label="Total meeting" rules={[{ required: true }]}>
              <Input placeholder="Total meeting..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="totalChair" label="Total chair" rules={[{ required: true }]}>
              <Input placeholder="Total chair..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="totalWhiteboard" label="Total whiteboard" rules={[{ required: true }]}>
              <Input placeholder="Total whiteboard..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="style" label="Style" rules={[{ required: true }]}>
              <Input placeholder="Style..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="icon" label="Icon" rules={[{ required: true }]}>
              <Input placeholder="Icon..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={24}>
            <Form.Item name="json" label="Json file" rules={[{ required: true }]}>
              <Upload
                fileList={fileList}
                onChange={handleChange}
                className="m-auto items-center text-white"
                accept="application/JSON"
              >
                {uploadButton}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalMap;
