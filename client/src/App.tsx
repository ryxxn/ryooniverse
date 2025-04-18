import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/home';
import { ReactQueryProvider, ToastProvider } from './shared/providers';
import useResponsive from './shared/hooks/use-responsive';
import BlockMobile from './shared/components/block-mobile';

export default function App() {
  const { isDesktop } = useResponsive();

  return (
    <ToastProvider>
      <ReactQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={isDesktop ? <HomePage /> : <BlockMobile />}
            />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ReactQueryProvider>
    </ToastProvider>
  );
}
