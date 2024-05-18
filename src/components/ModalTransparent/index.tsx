import { FC, ReactNode } from 'react';
import { ConfigProvider, Modal } from 'antd';
import './style.scss';

type Props = {
  open: boolean;
  children: ReactNode;
};

const ModalTransparent: FC<Props> = ({ open, children }) => {
  return (
    <ConfigProvider modal={{ classNames: { mask: 'modal-transparent-mask' } }}>
      <Modal
        open={open}
        centered
        className='modal-transparent'
        closable={false}
        maskClosable={false}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
};

export default ModalTransparent;
