import { BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';

import RenderRouter from './router';
import Loading from './components/Loading';

const Fallback = () => {
  return (
    <div className='flex-center z-maximum fixed inset-0 bg-white'>
      <Loading />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <RenderRouter />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
