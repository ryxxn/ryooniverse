import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/home';
import { ReactQueryProvider, ToastProvider } from './shared/providers';

export default function App() {
  return (
    <ToastProvider>
      <ReactQueryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ReactQueryProvider>
    </ToastProvider>
  );
}
