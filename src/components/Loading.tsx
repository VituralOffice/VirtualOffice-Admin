import { FC } from 'react';
import Lottie from 'lottie-react';
import clsx from 'clsx';

import LoadingAnimation from '@/assets/animations/loading.json';

type Props = {
  className?: string;
};

const Loading: FC<Props> = ({ className }) => {
  return (
    <div className={clsx(className, 'flex-center')}>
      <Lottie animationData={LoadingAnimation} loop={true} />
    </div>
  );
};

export default Loading;
