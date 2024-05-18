import { FC } from 'react';
import ModalTransparent from './ModalTransparent';
import Loading from './Loading';

type Props = {
  loading: boolean;
};

const ModalLoading: FC<Props> = ({ loading }) => {
  return (
    <ModalTransparent open={loading}>
      <Loading />
    </ModalTransparent>
  );
};

export default ModalLoading;
