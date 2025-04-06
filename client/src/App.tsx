import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          </Routes>
        </BrowserRouter>
      </ReactQueryProvider>
    </ToastProvider>
  );
}
